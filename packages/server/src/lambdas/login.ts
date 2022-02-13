require('@babel/polyfill')

import middy from 'middy'
import faunadb from 'faunadb'
import { JSONSchemaType } from 'ajv'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { LoginRequest, UserModel, LoginResponse } from '@won/core'

import {
  errorsMiddleware,
  validatorMiddleware,
  bodyParserMiddleware,
} from '../middlewares'
import { FaunaQuery, HttpMethods, RequestData } from '../types'
import { getFaunaDBClient } from '../helpers/fauna'
import { createToken } from '../helpers/authentication'
import {
  createInvalidHttpMethodResponse,
  createSuccessResponse,
} from '../helpers/responses'

const { Get, Index, Match, Login } = faunadb.query

const loginHandler = async (event: APIGatewayEvent, context: Context) => {
  const { body, httpMethod } = event

  switch (httpMethod as HttpMethods) {
    case 'POST': {
      // at this point body will have a proper type due to validation in middleware
      const { email, password } = body as unknown as LoginRequest

      const faunaDBClient = getFaunaDBClient()

      const { instance } = await faunaDBClient.query<{ instance: string }>(
        Login(Match(Index('user_by_email'), email), { password }),
      )

      const { data, ref } = await faunaDBClient.query<FaunaQuery<UserModel>>(
        Get(instance),
      )

      const jwtToken = createToken(ref.id)

      const respose: LoginResponse = {
        token: jwtToken,
        id: ref.id,
        name: data.name,
        email: data.email,
      }

      return createSuccessResponse(respose)
    }

    default: {
      return createInvalidHttpMethodResponse()
    }
  }
}

const inputSchema: JSONSchemaType<RequestData<LoginRequest>> = {
  type: 'object',
  required: ['body', 'httpMethod'],
  properties: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
      },
      required: ['email', 'password'],
    },
    httpMethod: {
      type: 'string',
    },
  },
}

export const handler = middy(loginHandler)
  .use(bodyParserMiddleware())
  .use(validatorMiddleware({ inputSchema }))
  .use(errorsMiddleware())
