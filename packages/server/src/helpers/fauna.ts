import dotenv from 'dotenv'
import faunadb from 'faunadb'

import { findEnv } from './findEnv'

dotenv.config({ path: findEnv() })

export const faunaDBClient = new faunadb.Client({
  secret: process.env.FAUNA_KEY
})
