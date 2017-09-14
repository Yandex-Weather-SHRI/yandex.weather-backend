import { config } from 'config/config'


// eslint-disable-next-line no-unused-vars
export function notFoundHandler(request, response, next) {
  response.status(404).json({
    code: 404,
    message: 'Not found',
  })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(error, request, response, next) {
  const data = {
    status: error.status || 500,
    message: error.message,
    stack: config.common.env === 'development' ? error.stack : undefined,
    ...error,
  }
  response.status(data.status).json(data)
}
