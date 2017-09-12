import { log } from 'utils/log'
import { config } from 'config/config'
import { expressService } from 'services/express/server'


const server = expressService()

server.listen(config.server.port, config.server.host, () => {
  log.green(`Server is running and listening on http://${config.server.host}:${config.server.port}`)
})
