// eslint-disable-next-line no-unused-vars
export function notFoundHandler(request, response, next) {
  response.status(404).json({
    code: 404,
    message: 'Not found',
  })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(error, request, response, next) {
  response.status(500).json({
    code: 500,
    stack: error.stack,
    message: error.message,
  })
}
