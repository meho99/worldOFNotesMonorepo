import { Expr } from 'faunadb'
import { FolderModel } from '@won/core'
import { APIGatewayEvent } from 'aws-lambda'

export type Ref = { id: string }

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
  ref: Ref;
}

export type JwtContent = { id?: string }
export type AuthenticatedAPIGatewayEvent = APIGatewayEvent & { user: Required<JwtContent> }

export type FoldersData = FaunaQuery<Omit<FolderModel, 'id'> & { user: Ref; }>
