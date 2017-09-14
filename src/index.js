import { log } from 'utils/log'
import { config } from 'config/config'
import { expressService } from 'services/express'
import { createMongooseConnection } from 'services/mongoose'


async function main() {
  try {
    const connection = await createMongooseConnection()
    const server = expressService()

    server.listen(config.server.port, config.server.host, () => {
      log.green(`DataBase is running and listening on ${connection.host}:${connection.port}`)
      log.green(`Server is running and listening on http://${config.server.host}:${config.server.port}`)
    })
  }
  catch (error) {
    log.red(error)
    process.exit(-1) // eslint-disable-line unicorn/no-process-exit
  }
}

main()
