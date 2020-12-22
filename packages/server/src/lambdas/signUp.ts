require('@babel/polyfill')

import faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { SignUpRequest, UserModel } from '@won/core'
import { SingUpResponse } from '@won/core/src'

import { FaunaQuery } from '../types'
import { faunaDBClient } from '../helpers/fauna'
import { createToken } from '../helpers/authentication'
import { createErrorResponse, createSuccessResponse } from '../helpers/responses'

const {
  Get,
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
  } catch (e) {
    return createErrorResponse(e)
  }
}
