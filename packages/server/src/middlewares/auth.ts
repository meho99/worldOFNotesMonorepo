import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { MiddlewareObject } from 'middy'
import { APIGatewayEvent } from 'aws-lambda'

import { findEnv } from '../helpers/findEnv'
import { createErrorResponse, createUnauthorizedErrorResponse } from '../helpers/responses'

dotenv.config({ path: findEnv() })

export const authMiddleware = (): MiddlewareObject<APIGatewayEvent, any> => {
  return ({
    before: async ({ event, callback }, next) => {
      try {
        const jwtToken = event.headers['authorization']

        if (!jwtToken) {
          callback(null, createUnauthorizedErrorResponse())
        }

        let decoded: { id?: number } = jwt.verify(jwtToken, process.env.JWT_SECRET) as { id?: number }

        event['user'] = decoded

        return next()
      } catch (e) {
        callback(null, createErrorResponse(e))
      }
    }
  })
}
