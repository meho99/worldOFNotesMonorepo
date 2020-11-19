import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { findEnv } from './findEnv'

dotenv.config({ path: findEnv() })

export const createToken = (email: string) => {
  const jwtToken = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: 3600 }
  )

  return jwtToken
}