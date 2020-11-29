require('@babel/polyfill')

import dotenv from 'dotenv'
import faunadb from 'faunadb'
import jwt from 'jsonwebtoken'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { findEnv } from '../helpers/findEnv'
import { faunaDBClient } from '../helpers/fauna'
import { FoldersData } from '../types'
import { createErrorResponse, createSuccessResponse, createUnauthorizedErrorResponse } from '../helpers/responses'

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

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const { httpMethod, headers, queryStringParameters } = event
  const jwtToken = headers['authorization']

  if (!jwtToken) {
    return createUnauthorizedErrorResponse()
  }

  let decoded: { id?: number } = {}

  try {
    decoded = jwt.verify(jwtToken, process.env.JWT_SECRET) as { id?: number }
  } catch (e) {
    return createErrorResponse(e)
  }

  try {
    if (httpMethod === 'GET') {
      const id = queryStringParameters.id
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
    return createErrorResponse(e)
  }
}
