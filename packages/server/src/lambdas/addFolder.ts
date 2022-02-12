require('@babel/polyfill')

import middy from 'middy'
import faunadb from 'faunadb'
import { JSONSchemaType } from 'ajv'
import { APIGatewayEvent, Context } from 'aws-lambda'

import { AddFolderRequest, AddFolderResponse, MAX_FOLDERS_PER_USER } from '@won/core'

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
  createErrorResponse,
  createInvalidHttpMethodResponse,
  createSuccessResponse,
} from '../helpers/responses'

const { Get, Ref, Index, Match, Count, Create, Paginate, Collection } = faunadb.query

const foldersHandler = async (event: APIGatewayEvent, context: Context) => {
  if (!isAuthenticated(event)) return

  const { httpMethod, user, body } = event

  const faunaDBClient = getFaunaDBClient()

  switch (httpMethod as HttpMethods) {
    case 'POST': {
      // at this point body will have a proper type due to validation in middleware
      const { name, description } = body as unknown as AddFolderRequest

      // -- validate if the user is allowed to add more folders --

      const userRef = Ref(Collection('Users'), user.id)

      const { data: countedFolders } = await faunaDBClient.query<{
        data: number
      }>(Count(Paginate(Match(Index('folders_by_user'), userRef))))

      if (countedFolders[0] >= MAX_FOLDERS_PER_USER) {
        return createErrorResponse({
          message: 'Max amount of folders per user exceeded',
        })
      }

      // -- validate if the user already has a folder with the same name --

      try {
        const folder = await faunaDBClient.query(
          Get(Match(Index('user_folder_by_name'), userRef, name)),
        )

        if (folder) {
          return createErrorResponse({
            message: 'Folder with the same name already exist',
          })
        }
      } catch (e) {}

      // -- add folder --

      const folder = {
        data: { name, description, user: userRef },
      }

      const { ref, data } = await faunaDBClient.query<FoldersData>(
        Create(Collection('Folders'), folder),
      )

      const response: AddFolderResponse = {
        ...data,
        id: ref.id,
      }

      return createSuccessResponse(response)
    }

    default: {
      return createInvalidHttpMethodResponse()
    }
  }
}

const inputSchema: JSONSchemaType<RequestData<AddFolderRequest>> = {
  type: 'object',
  required: ['body', 'httpMethod'],
  properties: {
    body: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        description: { type: 'string' },
      },
      required: ['name', 'description'],
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
