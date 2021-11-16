import { APIGatewayProxyEvent } from "aws-lambda";

export const createRequest = (requestData?: object, config?: Partial<APIGatewayProxyEvent>): Partial<APIGatewayProxyEvent> => ({
    headers: { 'Content-Type': 'application/json' },
    httpMethod: "POST",
    body: JSON.stringify(requestData),
    ...config
})