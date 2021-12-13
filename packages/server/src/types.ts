import { Expr } from 'faunadb'
import { FolderModel } from '@won/core'
import { APIGatewayEvent } from 'aws-lambda'

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type RequestData<Body> = {
  body: Body;
  httpMethod: HttpMethods
}

export type QueryStringData<Data> = {
  queryStringParameters: Data;
}

export type FaunaQuery<Data> = {
  data: Data;
  ref: { id: number };
}

export type JwtContent = { id?: number }
export type AuthenticatedAPIGatewayEvent = APIGatewayEvent & { user: Required<JwtContent> }

export type FoldersData = FaunaQuery<Omit<FolderModel, 'id'> & { user: Expr; }>
