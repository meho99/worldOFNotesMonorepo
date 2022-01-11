require('@babel/polyfill')

import middy from 'middy'
import faunadb from 'faunadb'
import { JSONSchemaType } from 'ajv'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { UpdateFolderRequest, UpdateFolderResponse } from '@won/core'

import { errorsMiddleware, authMiddleware, bodyParserMiddleware, validatorMiddleware } from '../middlewares'
import { FoldersData, HttpMethods, RequestData } from '../types'
import { getFaunaDBClient } from '../helpers/fauna'
import { isAuthenticated } from '../helpers/authentication'
import { createInvalidHttpMethodResponse, createSuccessResponse } from '../helpers/responses'

const {
  Get,
  Ref,
  Index,
  Match,
  Update,
  Collection
} = faunadb.query

const foldersHandler = async (event: APIGatewayEvent, context: Context) => {
  if (!isAuthenticated(event)) return

  const { httpMethod, user, body } = event

  const faunaDBClient = getFaunaDBClient();

  switch (httpMethod as HttpMethods) {
    case 'POST': {
      // at this point body will have a proper type due to validation in middleware
      const { id, ...dataToUpdate } = body as unknown as UpdateFolderRequest

      const userRef = Ref(Collection("Users"), user.id)

      // check if folder exist

      const { data: folderData } = await faunaDBClient.query<FoldersData>(
        Get(Match(
          Index("user_folder_by_id"),
          userRef,
          id
        ))
      )

      // -- update folder --

      const updatedFolder = {
        data: {
          ...folderData,
          ...dataToUpdate
        }
      }

      const { data: updatedData, ref } = await faunaDBClient.query<FoldersData>(
        Update(Ref(Collection('Folders'), id), updatedFolder)
      )

      const response: UpdateFolderResponse = {
        ...updatedData,
        id: ref.id
      }

      return createSuccessResponse(response)
    }

    default: {
      return createInvalidHttpMethodResponse()
    }
  }
}

const inputSchema: JSONSchemaType<RequestData<UpdateFolderRequest>> = {
  type: 'object',
  required: ['body', 'httpMethod'],
  properties: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
        id: { type: 'string' }
      },
      required: ['name', 'description', 'id']
    },
    httpMethod: {
      type: 'string'
    }
  }
}

export const handler = middy(foldersHandler)
  .use(authMiddleware())
  .use(bodyParserMiddleware())
  .use(validatorMiddleware({ inputSchema }))
  .use(errorsMiddleware())
