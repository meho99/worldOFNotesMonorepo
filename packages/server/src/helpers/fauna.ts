import dotenv from 'dotenv'
import faunadb, { ClientConfig } from 'faunadb'

import { findEnv } from './findEnv'

dotenv.config({ path: findEnv() })

const localConfig: ClientConfig = {
  secret: process.env.FAUNA_ADMIN_KEY as string,
  domain: process.env.FAUNADB_DOMAIN,
  port: Number(process.env.FAUNADB_PORT) as ClientConfig['port'],
  scheme: process.env.FAUNADB_SCHEME as ClientConfig['scheme'],
}

const prodConfig: ClientConfig = {
  secret: process.env.FAUNA_KEY as string,
}

export const faunaDBConfig = process.env.DB == 'cloud' ? prodConfig : localConfig

export const getFaunaDBClient = () => new faunadb.Client(faunaDBConfig)
