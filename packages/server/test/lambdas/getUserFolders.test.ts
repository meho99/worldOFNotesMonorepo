import faunadb from 'faunadb'
import lambdaTester from 'lambda-tester'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { AddFolderRequest, LoginRequest, LoginResponse, SignUpRequest, UserFoldersResponse } from '@won/core'

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

describe("getUserFolder", () => {
  describe("should fail", () => {
    it("when user is not authenticated", async () => {
      const request = createRequest(undefined, { httpMethod: 'GET' })

      await lambdaTester(getUserFoldersHandler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(401)
          expect(responseBody.message).toBe("Missing token, authorization denied")
        })
    })
  })

  describe("should suceed", () => {
    let loggedUserToken: string
    let loggedUserId: string
    let user2Id: string

    beforeEach(async () => {
      {// -- add user and login --
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
      }

      {// -- add second user --
        const user2Data: SignUpRequest = { email: 'test1@test.com', name: 'Test User1', password: '123123123' }
        const { id } = await addUser(dbClient, user2Data)
        user2Id = id
      }
    })

    it("when user doesn't have any folders", async () => {
      const getFoldersRequest = createRequest(undefined, { headers: createAuthHeaders(loggedUserToken), httpMethod: 'GET' })
      const expectedResponse: UserFoldersResponse = { folders: [] }

      await lambdaTester(getUserFoldersHandler)
        .event(getFoldersRequest as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body) as LoginResponse

          expect(result.statusCode).toBe(200)
          expect(responseBody).toEqual(expectedResponse)
        })
    })

    it("returns folders owned by user", async () => {
      const folder1: AddFolderRequest = { name: 'Test Folder 1', description: 'Test Desc 1' }
      const folder2: AddFolderRequest = { name: 'Test Folder 2', description: 'Test Desc 2' }
      const folder3: AddFolderRequest = { name: 'Test Folder 3', description: 'Test Desc 3' }

      // -- add 1 and 2 folders for logged user --

      await addFolder(dbClient, { ...folder1, userId: loggedUserId })
      await addFolder(dbClient, { ...folder2, userId: loggedUserId })

      // -- add one folder for second user --

      await addFolder(dbClient, { ...folder3, userId: user2Id })

      // -- get folders of logged user --

      const getFoldersRequest = createRequest(undefined, { headers: createAuthHeaders(loggedUserToken), httpMethod: 'GET' })
      const expectedResponse: UserFoldersResponse = {
        folders: [
          expect.objectContaining(folder1),
          expect.objectContaining(folder2),
        ]
      }

      await lambdaTester(getUserFoldersHandler)
        .event(getFoldersRequest as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body) as UserFoldersResponse

          expect(result.statusCode).toBe(200)
          expect(responseBody).toEqual(expectedResponse)
        })
    })
  })
})

