export const config = {
  common: {
    env: process.env.NODE_ENV || 'development',
  },
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 3100,
  },
  database: {
    connectionURI: process.env.MONGO_CONNECTION_URI,
    options: {
      user: process.env.MONGO_DB_USER,
      pass: process.env.MONGO_DB_PASS,
      autoIndex: false,
      server: {
        socketOptions: {
          keepAlive: 1,
          connectTimeoutMS: 30000,
        },
      },
    },
    debug: process.env.MONGO_DEBUG,
  },
}
