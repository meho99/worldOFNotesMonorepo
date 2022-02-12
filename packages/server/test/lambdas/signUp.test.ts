import faunadb from 'faunadb'
import jwt from 'jsonwebtoken'
import lambdaTester from 'lambda-tester'
import { APIGatewayProxyEvent } from 'aws-lambda'
import { SignUpRequest, LoginResponse, UserModel } from '@won/core'

import { FaunaQuery, JwtContent } from '../../src/types'
import { handler } from '../../src/lambdas/signUp'
import * as helpers from '../../src/helpers/fauna'
import { LambdaResponse } from '../../src/helpers/responses'

import { setupTestDatabase } from '../utils/fauna'
import { createRequest } from '../utils/helpers'
import { addUser } from '../utils/queries'

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

describe('signUp', () => {
  describe('data validation', () => {
    it('missing email', async () => {
      const requestData: SignUpRequest = {
        password: '321536dfh',
      } as SignUpRequest
      const request = createRequest(requestData)

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe('Event object failed validation')
          expect(responseBody.details[0].message).toBe(
            'must have required property email',
          )
        })
    })

    it('invalid email', async () => {
      const requestData: SignUpRequest = {
        name: 'Test Name',
        password: '321536dfh',
        email: 'testWrongFormat',
      }
      const request = createRequest(requestData)

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe('Event object failed validation')
          expect(responseBody.details[0].message).toBe(`must match format "email"`)
        })
    })

    it('missing password', async () => {
      const requestData: SignUpRequest = {
        email: 'w@w.w',
        name: 'Test Name',
      } as SignUpRequest

      const request = createRequest(requestData)

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe('Event object failed validation')
          expect(responseBody.details[0].message).toBe(
            'must have required property password',
          )
        })
    })

    it('missing name', async () => {
      const requestData: SignUpRequest = {
        email: 'w@w.w',
        password: '123123123123',
      } as SignUpRequest

      const request = createRequest(requestData)

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe('Event object failed validation')
          expect(responseBody.details[0].message).toBe('must have required property name')
        })
    })
  })

  describe('should fail', () => {
    it('when http method is not supported', async () => {
      const requestData: SignUpRequest = {
        email: 'w@w.w',
        name: 'Test User',
        password: '123123123123',
      }

      const request = createRequest(requestData, { httpMethod: 'GET' })

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe('HTTP method not supported')
        })
    })

    it('when user with the same email already exist', async () => {
      const password = 'testPassword123'
      const email = 'test@email.com'
      const name = 'Test User'

      // -- add user to database --

      await addUser(dbClient, { password, email, name })

      // -- try to sign up user with same email --

      const requestData: SignUpRequest = { email, password, name }
      const request = createRequest(requestData)

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResult((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(400)
          expect(responseBody.message).toBe('User already exists')
        })
    })
  })

  describe('should suceed', () => {
    it('with valid credentials', async () => {
      const { Get, Match, Index } = faunadb.query

      const password = 'testPassword123'
      const email = 'test@email.com'
      const name = 'Test User'

      // -- sign up --

      const requestData: SignUpRequest = { email, password, name }
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

          let decoded: JwtContent = jwt.verify(
            responseBody.token,
            process.env.JWT_SECRET as string,
          ) as JwtContent

          expect(decoded.id).toBeDefined()
        })

      // -- verify that user was added --

      const { data: addedUserData } = await dbClient.query<FaunaQuery<UserModel>>(
        Get(Match(Index('user_by_email'), email)),
      )

      expect(addedUserData.name).toBe(name)
      expect(addedUserData.email).toBe(email)
    })
  })
})
