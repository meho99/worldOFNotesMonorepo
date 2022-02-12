export const headers = {
  'Access-Control-Allow-Origin': '*',
}

export type ErrorDetail = {
  message: string
}

export type LambdaResponse = {
  statusCode: number
  headers: { [name: string]: string }
  body: string
}

export const createSuccessResponse = <ResponseData = Object>(
  body: ResponseData,
): LambdaResponse => ({
  statusCode: 200,
  headers,
  body: JSON.stringify(body),
})

export const createErrorResponse = <E = Object>(errorDetail: E): LambdaResponse => ({
  statusCode: 400,
  headers,
  body: JSON.stringify(errorDetail),
})

export const createInternalErrorResponse = <E = Object>(
  errorDetail: E,
): LambdaResponse => ({
  statusCode: 500,
  headers,
  body: JSON.stringify(errorDetail),
})

export const createUnauthorizedErrorResponse = (): LambdaResponse => ({
  statusCode: 401,
  headers,
  body: JSON.stringify({ message: 'Missing token, authorization denied' }),
})

export const createInvalidHttpMethodResponse = (): LambdaResponse =>
  createErrorResponse({
    message: 'HTTP method not supported',
  })
