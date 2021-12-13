require('@babel/polyfill')

import faunadb from 'faunadb'
import { JSONSchemaType } from 'ajv'
import { APIGatewayEvent, Context } from 'aws-lambda'
import middy from 'middy'

import { SignUpRequest, UserModel, SingUpResponse } from '@won/core'

import { errorsMiddleware, bodyParserMiddleware, validatorMiddleware } from '../middlewares'
import { FaunaQuery, HttpMethods, RequestData } from '../types'
import { getFaunaDBClient } from '../helpers/fauna'
import { createToken } from '../helpers/authentication'
import { createErrorResponse, createInvalidHttpMethodResponse, createSuccessResponse } from '../helpers/responses'

const {
  Get,
  Match,
  Index,
  Create,
  Collection
} = faunadb.query

const signUphandler = async (event: APIGatewayEvent, context: Context) => {
  const { body, httpMethod } = event

  switch (httpMethod as HttpMethods) {
    case 'POST': {
      // at this point body will have a proper type due to validation in middleware
      const { email, password, name } = body as unknown as SignUpRequest

      const faunaDBClient = getFaunaDBClient();

      try {
        const user = await faunaDBClient.query<{ user: UserModel }>(
          Get(
            Match(
              Index("user_by_email"),
              email
            )
          )
        )

        if (user) {
          return createErrorResponse({
            message: 'User already exists'
          })
        }
      } catch (e) { }

      const { data, ref } = await faunaDBClient.query<FaunaQuery<UserModel>>(
        Create(
          Collection('Users'), {
          credentials: { password },
          data: { email, name },
        }
        )
      )

      const jwtToken = createToken(ref.id)

      const response: SingUpResponse = {
        token: jwtToken,
        id: ref.id,
        name: data.name,
        email: data.email
      }

      return createSuccessResponse(response)
    }

    default: {
      return createInvalidHttpMethodResponse()
    }
  }
}

const inputSchema: JSONSchemaType<RequestData<SignUpRequest>> = {
  type: 'object',
  required: ['body', 'httpMethod'],
  properties: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' },
        name: { type: 'string' }
      },
      required: ['email', 'password', 'name']
    },
    httpMethod: {
      type: 'string'
    }
  }
}

export const handler = middy(signUphandler)
  .use(bodyParserMiddleware())
  .use(validatorMiddleware({ inputSchema }))
  .use(errorsMiddleware())
