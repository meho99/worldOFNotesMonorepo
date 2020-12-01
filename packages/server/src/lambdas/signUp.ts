require('@babel/polyfill')

import faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { createToken } from '../helpers/authentication'
import { faunaDBClient } from '../helpers/fauna'
import { createErrorResponse, createSuccessResponse } from '../helpers/responses'

import { SignUpRequest, UserModel } from '@won/core'
import { FaunaQuery } from '../types'

const {
  Login,
  Match,
  Index,
  Create,
  Collection
} = faunadb.query

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const { body, httpMethod } = event

  try {
    if (httpMethod === 'POST') {
      const { email, password, name }: SignUpRequest = JSON.parse(body) || {}

      if (!email || !password || !name) {
        return createErrorResponse({
          message: 'please enter all fields'
        })
      }

      try {
        const user = await faunaDBClient.query<{ secret: string }>(
          Login(
            Match(Index("user_by_email"), email),
            { password },
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
