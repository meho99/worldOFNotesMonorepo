import faunadb from 'faunadb'
import lambdaTester from 'lambda-tester'
import { APIGatewayProxyEvent } from 'aws-lambda'
import {
  LoginRequest,
  LoginResponse,
  UserFoldersResponse,
  UpdateFolderRequest,
  UpdateFolderResponse,
  SignUpRequest,
  DeleteFolderRequest,
} from '@won/core'

import { handler as deleteFolderHandler } from '../../src/lambdas/deleteFolder'
import { handler as getUserFoldersHandler } from '../../src/lambdas/getUserFolders'
import { handler as loginHandler } from '../../src/lambdas/login'

import * as helpers from '../../src/helpers/fauna'
import { LambdaResponse } from '../../src/helpers/responses'

import { setupTestDatabase } from '../utils/fauna'
import { addUser, addFolder } from '../utils/queries'
import { createAuthHeaders, createRequest } from '../utils/helpers'

jest.mock('../../src/helpers/fauna', () => {
  const helpers = jest.requireActual('../../src/helpers/fauna')

  return {
    ...helpers,
    getFaunaDBClient: jest.fn(),
  }
})

let dbClient: faunadb.Client

beforeEach(async () => {
  const client = await setupTestDatabase()
  if (client) dbClient = client
  ;(helpers.getFaunaDBClient as jest.Mock).mockImplementation(() => dbClient)
})

afterAll(() => {
  jest.clearAllMocks
})

describe('deleteFolder', () => {
  let loggedUserToken: string
  let loggedUserId: string

  beforeEach(async () => {
    // -- add user and login --
    const user1Data: SignUpRequest = {
      email: 'test2@email.com',
      name: 'Test User2',
      password: 'testPassword123',
    }

    const { id, token } = await addAndloginUser(user1Data)
    loggedUserToken = token
    loggedUserId = id
  })

  describe('data validation', () => {
    it('missing folder id', async () => {
      const requestData: UpdateFolderRequest = {
        name: 'test',
        description: 'desc',
      } as UpdateFolderRequest
      const request = createRequest(requestData, {
        httpMethod: 'DELETE',
        headers: createAuthHeaders(loggedUserToken),
      })

      await lambdaTester(deleteFolderHandler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe('Event object failed validation')
          expect(responseBody.details[0].message).toBe('must have required property id')
        })
    })
  })

  describe('should fail', () => {
    it('when user is not authenticated', async () => {
      const request = createRequest(undefined, { httpMethod: 'DELETE' })

      await lambdaTester(deleteFolderHandler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(401)
          expect(responseBody.message).toBe('Missing token, authorization denied')
        })
    })

    it('when folder is not owned by the user', async () => {
      // -- add folder --

      const { id } = await addFolder(dbClient, {
        userId: loggedUserId,
        name: 'folder',
        description: 'desc',
      })

      const folderId = id

      // try to update folder data

      const anotherUserData: SignUpRequest = {
        email: 'test3@email.com',
        name: 'Another User',
        password: 'testPassword123',
      }

      const { token } = await addAndloginUser(anotherUserData)

      const requestData: UpdateFolderRequest = {
        name: 'folder_updated',
        description: 'desc_updated',
        id: folderId,
      }
      const request = createRequest(requestData, {
        httpMethod: 'DELETE',
        headers: createAuthHeaders(token),
      })

      await lambdaTester(deleteFolderHandler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(500)
          expect(responseBody.message).toBe('instance not found')
        })
    })
  })

  describe('should suceed', () => {
    it('when all data is valid', async () => {
      // -- add folder --

      const { id } = await addFolder(dbClient, {
        userId: loggedUserId,
        name: 'folder',
        description: 'desc',
      })

      const folderId = id

      // -- update folder data --

      const requestData: DeleteFolderRequest = { id: folderId }
      const request = createRequest(requestData, {
        httpMethod: 'DELETE',
        headers: createAuthHeaders(loggedUserToken),
      })

      await lambdaTester(deleteFolderHandler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body) as UpdateFolderResponse

          expect(result.statusCode).toBe(200)
          expect(responseBody.id).toBeDefined()
          expect(responseBody.id).toBe(folderId)
        })

      // -- check if folder was deleted --

      const getFoldersRequest = createRequest(undefined, {
        httpMethod: 'GET',
        headers: createAuthHeaders(loggedUserToken),
      })

      await lambdaTester(getUserFoldersHandler)
        .event(getFoldersRequest as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body) as UserFoldersResponse

          const updatedFolder = responseBody.folders.find(
            (folder) => folder.id === folderId,
          )
          expect(updatedFolder).toBeUndefined()
        })
    })
  })
})

const addAndloginUser = async (userData: SignUpRequest) => {
  const requestData: LoginRequest = {
    email: userData.email,
    password: userData.password,
  }
  const loginRequest = createRequest(requestData)

  let token: string
  const { id } = await addUser(dbClient, userData)

  await lambdaTester(loginHandler)
    .event(loginRequest as APIGatewayProxyEvent)
    .expectResult((result: LambdaResponse) => {
      const responseBody = JSON.parse(result.body) as LoginResponse

      token = responseBody.token
    })

  return {
    id,
    // @ts-ignore
    token,
  }
}
