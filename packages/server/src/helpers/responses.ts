export const headers = {
  'Access-Control-Allow-Origin': '*'
}

export const createSuccessResponse = <ResponseData = Object>(body: ResponseData) => ({
  statusCode: 200,
  headers,
  body: JSON.stringify(body)
})

export const createErrorResponse = <ErrorDetail = Object>(errorDetail: ErrorDetail) => ({
  statusCode: 400,
  headers,
  body: JSON.stringify(errorDetail)
})

export const createInternalErrorResponse = <ErrorDetail = Object>(errorDetail: ErrorDetail) => ({
  statusCode: 500,
  headers,
  body: JSON.stringify(errorDetail)
})

export const createUnauthorizedErrorResponse = () => ({
  statusCode: 401,
  headers,
  body: JSON.stringify({ message: "No token authorization denied" })
})
