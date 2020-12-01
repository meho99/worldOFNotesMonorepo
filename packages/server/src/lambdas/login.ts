require('@babel/polyfill')

import faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'
import { LoginRequest, UserModel } from '@won/core'

import { faunaDBClient } from '../helpers/fauna'
import { createErrorResponse, createSuccessResponse } from '../helpers/responses'

import { createToken } from '../helpers/authentication'
import { FaunaQuery } from '../types'

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

      return createSuccessResponse({
        token: jwtToken,
        name: data.name,
        email: data.email
      })
    }
  } catch (e) {
    return createErrorResponse(e)
  }
}
