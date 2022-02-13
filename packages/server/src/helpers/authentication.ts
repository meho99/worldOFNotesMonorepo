import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { APIGatewayEvent } from 'aws-lambda'

import { findEnv } from './findEnv'
import { AuthenticatedAPIGatewayEvent } from '../types'

dotenv.config({ path: findEnv() })

export const createToken = (id: string) => {
  const jwtToken = jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: 3600,
  })

  return jwtToken
}

export const isAuthenticated = (
  event: APIGatewayEvent,
): event is AuthenticatedAPIGatewayEvent => {
  return !!event['user'] && !!event['user'].id
}
