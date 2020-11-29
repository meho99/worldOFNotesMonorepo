import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import { findEnv } from './findEnv'

dotenv.config({ path: findEnv() })

export const createToken = (id: number) => {
  const jwtToken = jwt.sign(
    { id },
    process.env.JWT_SECRET,
    { expiresIn: 3600 }
  )

  return jwtToken
}