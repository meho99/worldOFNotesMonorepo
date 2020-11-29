import { Expr } from 'faunadb'

export type UserData = Record<'email' | 'name', string>

export type SignUpRequest = Partial<UserData & {
  password: string;
}>

export type LoginRequest = Pick<SignUpRequest, 'email' | 'password'>

export type FoldersData =
  Record<'description' | 'name', string> & {
    user: Expr;
  }