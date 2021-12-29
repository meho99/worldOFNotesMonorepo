import faunadb from 'faunadb'
import lambdaTester from 'lambda-tester'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { AddFolderRequest, LoginRequest, LoginResponse, SignUpRequest, UserFoldersResponse, MAX_FOLDERS_PER_USER, AddFolderResponse } from '@won/core'

import { handler as addFolderHandler } from "../../src/lambdas/addFolder"
import { handler as getUserFoldersHandler } from "../../src/lambdas/getUserFolders"
import { handler as loginHandler } from "../../src/lambdas/login"

import * as helpers from '../../src/helpers/fauna'
import { LambdaResponse } from '../../src/helpers/responses'

import { setupTestDatabase } from '../utils/fauna'
import { addUser, addFolder } from '../utils/queries'
import { createAuthHeaders, createRequest } from '../utils/helpers'

jest.mock('../../src/helpers/fauna', () => {
  const helpers = jest.requireActual('../../src/helpers/fauna')

  return {
    ...helpers,
    getFaunaDBClient: jest.fn()
  }
})

let dbClient: faunadb.Client

beforeEach(async () => {
  const client = await setupTestDatabase();
  if (client) dbClient = client;

  (helpers.getFaunaDBClient as jest.Mock).mockImplementation(() => dbClient)
})

afterAll(() => {
  jest.clearAllMocks
})

describe("addFolder", () => {
  let loggedUserToken: string
  let loggedUserId: string

  beforeEach(async () => {
    // -- add user and login --
    const user1Data: SignUpRequest = { email: 'test2@email.com', name: 'Test User2', password: 'testPassword123' }
    const { id } = await addUser(dbClient, user1Data)
    loggedUserId = id

    const requestData: LoginRequest = { email: user1Data.email, password: user1Data.password }
    const loginRequest = createRequest(requestData)

    await lambdaTester(loginHandler)
      .event(loginRequest as APIGatewayProxyEvent)
      .expectResult((result: LambdaResponse) => {
        const responseBody = JSON.parse(result.body) as LoginResponse

        loggedUserToken = responseBody.token
      })
  })

  describe("data validation", () => {
    it("missing name", async () => {
      const requestData: AddFolderRequest = { description: 'test2' } as AddFolderRequest
      const request = createRequest(requestData, { httpMethod: 'POST', headers: createAuthHeaders(loggedUserToken) })

      await lambdaTester(addFolderHandler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe("Event object failed validation")
          expect(responseBody.details[0].message).toBe("must have required property name")
        })
    })

    it("invalid name", async () => {
      const requestData: AddFolderRequest = { description: 'test2', name: { test: true } } as unknown as AddFolderRequest
      const request = createRequest(requestData, { httpMethod: 'POST', headers: createAuthHeaders(loggedUserToken) })

      await lambdaTester(addFolderHandler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe("Event object failed validation")
          expect(responseBody.details[0].message).toBe("must be string")
        })
    })

    it("missing description", async () => {
      const requestData: AddFolderRequest = { name: 'test' } as AddFolderRequest
      const request = createRequest(requestData, { httpMethod: 'POST', headers: createAuthHeaders(loggedUserToken) })

      await lambdaTester(addFolderHandler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe("Event object failed validation")
          expect(responseBody.details[0].message).toBe("must have required property description")
        })
    })
  })

  describe("should fail", () => {
    it("when user is not authenticated", async () => {
      const request = createRequest(undefined, { httpMethod: 'POST' })

      await lambdaTester(addFolderHandler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(401)
          expect(responseBody.message).toBe("Missing token, authorization denied")
        })
    })

    it("when user already has folder with the same name", async () => {
      const name = 'testFolder'
      await addFolder(dbClient, { name, description: 'test', userId: loggedUserId })

      const requestData: AddFolderRequest = { name, description: 'test2' }
      const request = createRequest(requestData, { httpMethod: 'POST', headers: createAuthHeaders(loggedUserToken) })

      await lambdaTester(addFolderHandler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe("Folder with the same name already exist")
        })
    })

    it("when user exceeds max number of folders", async () => {
      // -- add max amount of folders for user --

      const promises = Array.from({ length: MAX_FOLDERS_PER_USER }).map((_, index) => {
        return addFolder(dbClient, {
          userId: loggedUserId,
          name: `folder_${index}`,
          description: 'added in the loop',
        })
      })

      await Promise.all(promises)

      // -- try to add one more folder --

      const requestData: AddFolderRequest = { name: 'folderek', description: 'test2' }
      const request = createRequest(requestData, { httpMethod: 'POST', headers: createAuthHeaders(loggedUserToken) })

      await lambdaTester(addFolderHandler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe("Max amount of folders per user exceeded")
        })
    })
  })

  describe("should suceed", () => {
    it("when all data is valid", async () => {
      // -- add folder --

      const requestData: AddFolderRequest = { name: 'folder', description: 'test2' }
      const request = createRequest(requestData, { httpMethod: 'POST', headers: createAuthHeaders(loggedUserToken) })

      let addedFolderId: string;

      await lambdaTester(addFolderHandler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body) as AddFolderResponse

          expect(result.statusCode).toBe(200)
          expect(responseBody.id).toBeDefined()
          expect(responseBody.name).toBe(requestData.name)
          expect(responseBody.description).toBe(requestData.description)

          addedFolderId = responseBody.id
        })

      // -- check if folder was properly added to database --

      const getFoldersRequest = createRequest(undefined, { httpMethod: 'GET', headers: createAuthHeaders(loggedUserToken) })

      await lambdaTester(getUserFoldersHandler)
        .event(getFoldersRequest as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body) as UserFoldersResponse

          const isAdded = responseBody.folders.findIndex(folder => folder.id === addedFolderId)
          expect(isAdded).toBeGreaterThanOrEqual(0)
        })
    })
  })
})
