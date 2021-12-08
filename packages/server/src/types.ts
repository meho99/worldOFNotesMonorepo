import { Expr } from 'faunadb'
import { FoldersModel } from '@won/core'

export type RequestData <Body> = {
  body: Body;
}

export type FaunaQuery <Data> = {
  data: Data;
  ref: { id: number };
}

export type JwtContent = { id?: number }

export type FoldersData =
  FoldersModel & {
    user: Expr;
  }
