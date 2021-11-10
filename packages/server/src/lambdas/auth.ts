require('@babel/polyfill')

import middy from 'middy'
import dotenv from 'dotenv'
import faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { AuthResponse, UserModel } from '@won/core'
import { findEnv } from '../helpers/findEnv'
import { getFaunaDBClient } from '../helpers/fauna'
import { authMiddleware } from '../middlewares/auth'
import { createInternalErrorResponse, createSuccessResponse } from '../helpers/responses'
import { FaunaQuery } from '../types'

dotenv.config({ path: findEnv() })

const {
  Get,
  Ref,
  Collection
} = faunadb.query

const authHandler = async (event: APIGatewayEvent, context: Context) => {
  const { httpMethod } = event
  try {
    if (httpMethod === 'GET') {
      const userId: number = event['user']?.id

      const faunaDBClient = getFaunaDBClient();

      const { data, ref } = await faunaDBClient.query<FaunaQuery<UserModel>> (
        Get(
          Ref(
            Collection("Users"), userId
          )
        )
      )

      const response: AuthResponse = {
        ...data,
        id: ref.id
      }

      return createSuccessResponse(response)
    }
  } catch (e) {
    return createInternalErrorResponse(e)
  }
}

export const handler = middy(authHandler)
  .use(authMiddleware())
