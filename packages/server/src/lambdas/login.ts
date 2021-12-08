require('@babel/polyfill')

import faunadb from 'faunadb'
import middy from 'middy'
import { JSONSchemaType } from 'ajv'
import { APIGatewayEvent, Context } from 'aws-lambda'
import validator from '@middy/validator'
import jsonBodyParser from '@middy/http-json-body-parser'

import { LoginRequest, UserModel, LoginResponse } from '@won/core'

import { FaunaQuery, RequestData } from '../types'
import { getFaunaDBClient } from '../helpers/fauna'
import { createToken } from '../helpers/authentication'
import { createSuccessResponse } from '../helpers/responses'
import { errorsMiddleware } from '../middlewares/errorsMiddleware'

const {
  Get,
  Index,
  Match,
  Login
} = faunadb.query

const loginHandler = async (event: APIGatewayEvent, context: Context) => {
  const { body, httpMethod } = event

  if (httpMethod === 'POST') {
    // at this point body will have a proper type due to validation in middleware
    const { email, password } = body as unknown as LoginRequest

    const faunaDBClient = getFaunaDBClient();

    const { instance } = await faunaDBClient.query<{ instance: string }>(
      Login(
        Match(Index("user_by_email"), email),
        { password },
      )
    )

    const { data, ref } = await faunaDBClient.query<FaunaQuery<UserModel>>(
      Get(instance)
    )

    const jwtToken = createToken(ref.id)

    const respose: LoginResponse = {
      token: jwtToken,
      id: ref.id,
      name: data.name,
      email: data.email
    }

    return createSuccessResponse(respose)
  }
}

const inputSchema: JSONSchemaType<RequestData<LoginRequest>> = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string' }
      },
      required: ['email', 'password']
    }
  }
}

export const handler = middy(loginHandler)
  .use(jsonBodyParser())
  .use(validator({ inputSchema }))
  .use(errorsMiddleware())
