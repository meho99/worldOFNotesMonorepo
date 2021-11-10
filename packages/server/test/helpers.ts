import { exec } from 'child_process'
import { query, Client } from "faunadb"
import { faunaDBConfig } from '../src/helpers/fauna'

const {
  Do,
  If,
  Map,
  Let,
  Var,
  Get,
  Keys,
  Select,
  Equals,
  Delete,
  Exists,
  Paginate,
  Database,
  CreateKey,
  Documents,
  CreateDatabase,
} = query

const parentFauna = new Client(faunaDBConfig)
const faunaConfig = faunaDBConfig
const CHILD_DB_NAME = 'test'

// ----- clear existing test database if exist -----

const removeIfExist = async () => {
  // delete keys - delete keys linked to database

  await parentFauna.query<{ data: any }>(
    Map(Paginate(Documents(Keys())), x =>
      Let(
        {
          key: Get(x),
          ref: Select(['ref'], Var('key')),
          db: Select(['database'], Var('key'), 'none')
        },
        If(Equals(Var('db'), Database(CHILD_DB_NAME)), Delete(Var('ref')), false)
      )
    )
  )

  // delete child database

  await parentFauna.query(
    If(
      Exists(Database(CHILD_DB_NAME)),
      Delete(Database(CHILD_DB_NAME)),
      false
    )
  )
}

// ----- create child database -----

const createChildDatabase = async () => {
  const { secret } = await parentFauna.query<{ secret: string }>(
    Do(
      CreateDatabase({
        name: CHILD_DB_NAME
      }),
      CreateKey({
        database: Database(CHILD_DB_NAME),
        role: "server"
      })
    )
  )

  const childFauna = new Client({ ...faunaConfig, secret })

  return childFauna
}

// ----- run migrations agains database -----

const runMigrations = async () => {
  return new Promise<void>((resolve, reject) => {
    exec(
      `npx fauna-schema-migrate -c ${CHILD_DB_NAME} apply`,
      { env: process.env },
      (error, stdout, stderr) => {
        if (error || stderr) {
          reject()
          return;
        }
        resolve()
      })
  })
}

export const setupTestDatabase = async () => {
  await removeIfExist()

  const childDatabase = createChildDatabase()

  await runMigrations()

  return childDatabase
}