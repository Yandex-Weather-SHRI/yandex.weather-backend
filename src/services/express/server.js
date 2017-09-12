import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

import { notFoundHandler, errorHandler } from 'middlewares/error'
import { api } from 'api'


export function expressService() {
  const app = express()
  const corsOptions = {
    maxAge: 43200,
  }

  app.disable('x-powered-by')

  // apply middlewares
  app.use('*', cors(corsOptions))
  app.use(morgan('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

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
