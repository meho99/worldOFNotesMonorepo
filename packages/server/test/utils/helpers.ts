import { APIGatewayProxyEvent } from 'aws-lambda'

export const createRequest = (
  requestData?: object,
  config?: Partial<APIGatewayProxyEvent>,
): Partial<APIGatewayProxyEvent> => {
  const body = JSON.stringify(requestData)

  let headers = { 'Content-Type': 'application/json' }
  let httpMethod = 'POST'
  let overrides: Partial<APIGatewayProxyEvent> = {}

  if (config) {
    const { headers: configHeaders, httpMethod: configMethod, ...rest } = config

    headers = { ...headers, ...configHeaders }
    httpMethod = configMethod ?? httpMethod
    overrides = rest
  }

  return { headers, httpMethod, body, ...overrides }
}

export const createAuthHeaders = (token: string) => ({
  authorization: token,
})
