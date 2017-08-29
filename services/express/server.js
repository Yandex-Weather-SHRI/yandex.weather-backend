'use strict'

const path = require('path')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { notFoundHandler, errorHandler } = require('../../middlewares/error')
const { locationMiddleware } = require('../../middlewares/location')
const { api } = require('../../api')


function expressService() {
  const app = express()

  app.disable('x-powered-by')

  // apply middlewares
  app.use('*', cors())
  app.use(morgan('dev'))
  app.use(locationMiddleware)

  app.get('/ping', (request, response) => {
    response.json({ message: 'pong' })
  })

  // apply api
  app.use('/v1', api)

  // error middlewares
  app.use(notFoundHandler)
  app.use(errorHandler)

  return app
}

module.exports.expressService = expressService
