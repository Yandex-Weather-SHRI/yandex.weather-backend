'use strict'

function notFoundHandler(request, response, next) {
  response.status(404).json({
    code: 404,
    message: 'Not found',
  })
}

function errorHandler(error, request, response, next) {
  response.status(500).json({
    code: 500,
    message: error,
  })
}

module.exports = {
  notFoundHandler,
  errorHandler,
}
