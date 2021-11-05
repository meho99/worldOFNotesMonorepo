import dotenv from 'dotenv'
import faunadb, { ClientConfig } from 'faunadb'

import { findEnv } from './findEnv'

dotenv.config({ path: findEnv() })

const localConfig: ClientConfig = {
  secret: process.env.FAUNA_ADMIN_KEY,
  domain: process.env.FAUNADB_DOMAIN,
  port: Number(process.env.FAUNADB_PORT) as ClientConfig['port'],
  scheme: process.env.FAUNADB_SCHEME as ClientConfig['scheme']
}

const prodConfig: ClientConfig = {
  secret: process.env.FAUNA_KEY
}

export const faunaDBClient = new faunadb.Client(process.env.DB == "cloud" ? prodConfig : localConfig)
