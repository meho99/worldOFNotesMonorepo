import lambdaTester from 'lambda-tester'
import { APIGatewayProxyEvent } from 'aws-lambda';
import { LoginRequest } from '@won/core';
import { handler } from "../../src/lambdas/login";
import { LambdaResponse } from '../../src/helpers/responses';

describe("login", () => {
  describe("should fail", () => {
    it("when user data is not valid", async () => {
      const requestData: LoginRequest = {
        email: 'test@test',
        password: '321536dfh'
      }

      const request: Partial<APIGatewayProxyEvent> = {
        httpMethod: "POST",
        body: JSON.stringify(requestData)
      }

      await lambdaTester(handler)
        .event(request as APIGatewayProxyEvent)
        .expectResolve((result: LambdaResponse) => {
          const responseBody = JSON.parse(result.body)

          expect(result.statusCode).toBe(500)
          expect(responseBody.message).toBe("authentication failed")
        })
    })
  })
})
