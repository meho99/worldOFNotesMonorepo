require('@babel/polyfill')

import middy from 'middy'
import dotenv from 'dotenv'
import faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { FoldersData } from '../types'
import { findEnv } from '../helpers/findEnv'
import { getFaunaDBClient } from '../helpers/fauna'
import { authMiddleware } from '../middlewares/auth'
import { createInternalErrorResponse, createSuccessResponse } from '../helpers/responses'

dotenv.config({ path: findEnv() })

const {
  Map,
  Var,
  Get,
  Ref,
  Index,
  Match,
  Select,
  Lambda,
  Paginate,
  Collection
} = faunadb.query

const foldersHandler = async (event: APIGatewayEvent, context: Context) => {
  const { httpMethod, queryStringParameters } = event
  try {
    if (httpMethod === 'GET') {
      const id = queryStringParameters.id

      const faunaDBClient = getFaunaDBClient();

      const foldersData = await faunaDBClient.query<{ data: FoldersData[] }>(
        Map(
          Paginate(
            Match(
              Index("folders_by_user"),
              Ref(Collection("Users"), id)
            )
          ),
          Lambda("ref", Select(["data"], Get(Var("ref"))))
        )
      )

      const parsedFoldersData = foldersData.data.map(({ user, ...rest }) => rest)
      return createSuccessResponse(parsedFoldersData)
    }
  } catch (e) {
    return createInternalErrorResponse(e)
  }
}

export const handler = middy(foldersHandler)
  .use(authMiddleware())
