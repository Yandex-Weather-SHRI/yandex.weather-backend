import mongoose from 'mongoose'

import { config } from 'config/config'


export function createMongooseConnection() {
  if (config.common.env === 'development') {
    mongoose.set('debug', parseInt(config.database.debug, 10))
  }

  return new Promise(async (resolve, reject) => {
    try {
      mongoose.Promise = Promise
      await mongoose.connect(config.database.connectionURI, config.database.options)
      resolve(mongoose.connection)
    }
    catch (error) {
      reject(error)
    }
  })
}
