import errorHandler from '@schibsted/middy-error-handler'

export const errorsMiddleware = () => errorHandler({
  logger: {
    error: (e) => {
      if (!e?.error?.statusCode || e?.error?.statusCode >= 500) {
        // console.error(e)
      }
    }
  }
})
