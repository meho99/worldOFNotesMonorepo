require('@babel/polyfill')

import faunadb from 'faunadb'
import middy from 'middy'
import { APIGatewayEvent, Context } from 'aws-lambda'
import jsonBodyParser from '@middy/http-json-body-parser'

import { LoginRequest, UserModel, LoginResponse } from '@won/core'

import { FaunaQuery } from '../types'
import { getFaunaDBClient } from '../helpers/fauna'
import { createToken } from '../helpers/authentication'
import { createInternalErrorResponse, createSuccessResponse } from '../helpers/responses'

const {
  Get,
  Index,
  Match,
  Login
} = faunadb.query

const loginHandler = async (event: APIGatewayEvent, context: Context) => {
  const { body, httpMethod } = event

  try {
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
  } catch (e) {
    return createInternalErrorResponse(e)
  }
}

export const handler = middy(loginHandler)
  .use(jsonBodyParser())
