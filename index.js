'use strict'

const { log } = require('./utils/log')
const { config } = require('./config/config')
const { expressService } = require('./services/express/server');


const server = expressService()

server.listen(config.server.port, config.server.host, () => {
  log.green(`Server is running and listening on http://${config.server.host}:${config.server.port}`);
})
