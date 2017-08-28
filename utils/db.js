const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')


const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: [] })
  .write()

function getUserByName(name) {
  return db.get('users').find({ login: name }).cloneDeep().value()
}

function isUserExists(name) {
  return Boolean(getUserByName(name))
}

function getUserSettings(name) {
  return getUserByName(name).settings
}

function createUser(name, settings) {
  return isUserExists(name) ? false : Boolean(db.get('users').push({login: name, settings: settings}).write())
}

function updateUserSettings(name, settings) {
  return isUserExists(name) ? Boolean(db.get('users').find({ login: name }).assign({ settings: settings}).write()) : false
}

module.exports = {
  getUserByName,
  isUserExists,
  getUserSettings,
  createUser,
  updateUserSettings,
}
