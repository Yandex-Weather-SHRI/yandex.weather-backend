import path from 'path'


export function dbAPI(api) {
  api.get('/export_db', (request, response) => {
    response.sendFile(path.resolve(__dirname, '..', '..', 'db.json'))
  })
}
