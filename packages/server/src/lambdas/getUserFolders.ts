require('@babel/polyfill')

import middy from 'middy'
import faunadb from 'faunadb'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { FolderModel, UserFoldersResponse } from '@won/core'

import { errorsMiddleware, authMiddleware } from '../middlewares'
import { FoldersData, HttpMethods } from '../types'
import { getFaunaDBClient } from '../helpers/fauna'
import { isAuthenticated } from '../helpers/authentication'
import {
  createInvalidHttpMethodResponse,
  createSuccessResponse,
} from '../helpers/responses'

const { Map, Var, Get, Ref, Index, Match, Lambda, Paginate, Collection } = faunadb.query

const foldersHandler = async (event: APIGatewayEvent, context: Context) => {
  if (!isAuthenticated(event)) return

  const { httpMethod, user } = event

  const faunaDBClient = getFaunaDBClient()

  switch (httpMethod as HttpMethods) {
    case 'GET': {
      const { data: foldersData } = await faunaDBClient.query<{
        data: FoldersData[]
      }>(
        Map(
          Paginate(Match(Index('folders_by_user'), Ref(Collection('Users'), user.id))),
          Lambda('ref', Get(Var('ref'))),
        ),
      )

      const parsedFoldersData: FolderModel[] = foldersData.map(({ ref, data }) => {
        const { user, ...filteredData } = data

        return {
          id: ref.id,
          ...filteredData,
        }
      })

      const response: UserFoldersResponse = {
        folders: parsedFoldersData,
      }

      return createSuccessResponse(response)
    }

    default: {
      return createInvalidHttpMethodResponse()
    }
  }
}

export const handler = middy(foldersHandler).use(authMiddleware()).use(errorsMiddleware())
