'use strict'

module.exports.config = {
  common: {
    env: process.env.NODE_ENV || 'development',
  },
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3100,
  },
  exportDataBaseURL: process.env.EXPORT_DB_URL || null
}
