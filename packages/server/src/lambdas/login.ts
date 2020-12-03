require('@babel/polyfill')

import faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { LoginRequest, UserModel, LoginResponse } from '@won/core'

import { FaunaQuery } from '../types'
import { faunaDBClient } from '../helpers/fauna'
import { createToken } from '../helpers/authentication'
import { createErrorResponse, createSuccessResponse } from '../helpers/responses'

const {
  Get,
  Index,
  Match,
  Login
} = faunadb.query

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const { body, httpMethod } = event

  try {
    if (httpMethod === 'POST') {
      const { email, password }: LoginRequest = JSON.parse(body) || {}

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
    return createErrorResponse(e)
  }
}
