import { Expr } from 'faunadb'
import { FoldersModel } from '@won/core'

export type FaunaQuery <Data> = {
  data: Data;
  ref: { id: number };
}

export type FoldersData =
  FoldersModel & {
    user: Expr;
  }