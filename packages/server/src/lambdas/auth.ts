require('@babel/polyfill')

import middy from 'middy'
import dotenv from 'dotenv'
import faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { UserModel } from '@won/core'
import { findEnv } from '../helpers/findEnv'
import { faunaDBClient } from '../helpers/fauna'
import { authMiddleware } from '../middlewares/auth'
import { createErrorResponse, createSuccessResponse } from '../helpers/responses'

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

      const { data } = await faunaDBClient.query<{ data: UserModel }> (
        Get(
          Ref(
            Collection("Users"), userId
          )
        )
      )

      return createSuccessResponse(data)
    }
  } catch (e) {
    return createErrorResponse(e)
  }
}

export const handler = middy(authHandler)
  .use(authMiddleware())
