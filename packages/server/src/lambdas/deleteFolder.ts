require('@babel/polyfill')

import middy from 'middy'
import faunadb from 'faunadb'
import { JSONSchemaType } from 'ajv'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { DeleteFolderRequest, DeleteFolderResponse } from '@won/core'

import {
  errorsMiddleware,
  authMiddleware,
  bodyParserMiddleware,
  validatorMiddleware,
} from '../middlewares'
import { FoldersData, HttpMethods, RequestData } from '../types'
import { getFaunaDBClient } from '../helpers/fauna'
import { isAuthenticated } from '../helpers/authentication'
import {
  createInvalidHttpMethodResponse,
  createSuccessResponse,
} from '../helpers/responses'

const { Get, Ref, Index, Match, Delete, Collection } = faunadb.query

const foldersHandler = async (event: APIGatewayEvent, context: Context) => {
  if (!isAuthenticated(event)) return

  const { httpMethod, user, body } = event

  const faunaDBClient = getFaunaDBClient()

  switch (httpMethod as HttpMethods) {
    case 'DELETE': {
      // at this point body will have a proper type due to validation in middleware
      const { id } = body as unknown as DeleteFolderRequest

      const userRef = Ref(Collection('Users'), user.id)

      // check if folder exist and it's owned by the user

      await faunaDBClient.query<FoldersData>(
        Get(Match(Index('user_folder_by_id'), userRef, id)),
      )

      // -- delete folder --

      await faunaDBClient.query<FoldersData>(Delete(Ref(Collection('Folders'), id)))

      const response: DeleteFolderResponse = { id }

      return createSuccessResponse(response)
    }

    default: {
      return createInvalidHttpMethodResponse()
    }
  }
}

const inputSchema: JSONSchemaType<RequestData<DeleteFolderRequest>> = {
  type: 'object',
  required: ['body', 'httpMethod'],
  properties: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
      required: ['id'],
    },
    httpMethod: {
      type: 'string',
    },
  },
}

export const handler = middy(foldersHandler)
  .use(authMiddleware())
  .use(bodyParserMiddleware())
  .use(validatorMiddleware({ inputSchema }))
  .use(errorsMiddleware())
