import faunadb from 'faunadb'
import lambdaTester from 'lambda-tester'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { LoginRequest, LoginResponse, UserModel } from '@won/core'

import { FaunaQuery } from '../../src/types'
import { handler } from "../../src/lambdas/login"
import * as helpers from '../../src/helpers/fauna'
import { LambdaResponse } from '../../src/helpers/responses'

import { setupTestDatabase } from '../helpers'

jest.mock('../../src/helpers/fauna', () => {
  const helpers = jest.requireActual('../../src/helpers/fauna')

  return {
    ...helpers,
    getFaunaDBClient: jest.fn()
  }
})

let dbClient: faunadb.Client

beforeEach(async () => {
  dbClient = await setupTestDatabase();

  (helpers.getFaunaDBClient as jest.Mock).mockImplementationOnce(() => dbClient)
})

afterAll(() => {
  jest.clearAllMocks
})

describe("login", () => {
  describe("should fail", () => {
    it("when user data is not valid", async () => {
      const requestData: LoginRequest = {
        email: 'test@test',
        password: '321536dfh'
      }

      const request: Partial<APIGatewayProxyEvent> = {
        httpMethod: "POST",
        body: JSON.stringify(requestData)
      }

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResolve((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(500)
          expect(responseBody.message).toBe("authentication failed")
        })
    })
  })

  describe("should suceed", () => {
    it("with valid credentials", async () => {
      const {
        Create,
        Collection
      } = faunadb.query

      const password = 'testPassword123'
      const email = 'test@email.com'
      const name = 'Test User'

      // -- add user to database --

      await dbClient.query<FaunaQuery<UserModel>>(
        Create(
          Collection('Users'),
          {
            credentials: { password },
            data: { email, name },
          }
        )
      )

      // -- login --

      const requestData: LoginRequest = { email, password }

      const request: Partial<APIGatewayProxyEvent> = {
        httpMethod: "POST",
        body: JSON.stringify(requestData)
      }

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResolve((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body) as LoginResponse

          expect(result.statusCode).toBe(200)
          expect(responseBody.email).toBe(email)
          expect(responseBody.name).toBe(name)
          expect(responseBody.token.length).toBeGreaterThan(0)
          expect(responseBody.id).toBeDefined()
        })
    })
  })
})
