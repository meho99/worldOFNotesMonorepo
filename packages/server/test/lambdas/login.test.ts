import faunadb from 'faunadb'
import jwt from 'jsonwebtoken'
import lambdaTester from 'lambda-tester'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { LoginRequest, LoginResponse, UserModel } from '@won/core'

import { FaunaQuery, JwtContent } from '../../src/types'
import { handler } from "../../src/lambdas/login"
import * as helpers from '../../src/helpers/fauna'
import { LambdaResponse } from '../../src/helpers/responses'

import { setupTestDatabase } from '../utils/fauna'
import { createRequest } from '../utils/helpers'

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

describe("login", () => {
  describe("should fail", () => {
    it("when user data is not valid", async () => {
      const requestData: LoginRequest = {
        email: 'test@test.te',
        password: '321536dfh'
      }
      const request = createRequest(requestData)

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(500)
          expect(responseBody.message).toBe("authentication failed")
        })
    })

    it("when email is missing", async () => {
      const requestData: LoginRequest = {
        password: '321536dfh'
      } as LoginRequest
      const request = createRequest(requestData)

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)
        
          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe("Event object failed validation")
          expect(responseBody.details[0].message).toBe("must have required property email")
        })
    })

    it("when email is invalid", async () => {
      const requestData: LoginRequest = {
        password: '321536dfh',
        email: 'testWrongFormat'
      }
      const request = createRequest(requestData)

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)
        
          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe("Event object failed validation")
          expect(responseBody.details[0].message).toBe(`must match format "email"`)
        })
    })

    it("when password is missing", async () => {
      const requestData: LoginRequest = {
        email: 'w@w.w'
      } as LoginRequest

      const request = createRequest(requestData)

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)
        
          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe("Event object failed validation")
          expect(responseBody.details[0].message).toBe("must have required property password")
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
      const request = createRequest(requestData)

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body) as LoginResponse

          expect(result.statusCode).toBe(200)
          expect(responseBody.email).toBe(email)
          expect(responseBody.name).toBe(name)
          expect(responseBody.token.length).toBeGreaterThan(0)
          expect(responseBody.id).toBeDefined()

          let decoded: JwtContent = jwt.verify(responseBody.token, process.env.JWT_SECRET as string) as JwtContent

          expect(decoded.id).toBeDefined()
        })
    })
  })
})
