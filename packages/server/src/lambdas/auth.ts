require('@babel/polyfill')

import middy from 'middy'
import dotenv from 'dotenv'
import faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { AuthResponse, UserModel } from '@won/core'
import { authMiddleware } from '../middlewares'
import { FaunaQuery } from '../types'
import { findEnv } from '../helpers/findEnv'
import { getFaunaDBClient } from '../helpers/fauna'
import { isAuthenticated } from '../helpers/authentication'
import { createSuccessResponse } from '../helpers/responses'

dotenv.config({ path: findEnv() })

const {
  Get,
  Ref,
  Collection
} = faunadb.query

const authHandler = async (event: APIGatewayEvent, context: Context) => {
  if (!isAuthenticated(event)) return

  const { httpMethod, user } = event

  if (httpMethod === 'GET') {
    const faunaDBClient = getFaunaDBClient();

    const { data, ref } = await faunaDBClient.query<FaunaQuery<UserModel>>(
      Get(
        Ref(
          Collection("Users"), user.id
        )
      )
    )

    const response: AuthResponse = {
      ...data,
      id: ref.id
    }

    return createSuccessResponse(response)
  }
}

export const handler = middy(authHandler)
  .use(authMiddleware())
