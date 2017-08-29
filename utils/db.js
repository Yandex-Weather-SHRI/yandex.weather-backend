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
  return isUserExists(name) ? getUserByName(name).settings.category : false
}

function createUser(name, settings) {
  if(isUserExists(name))
    return false // TODO
  return db.get('users').push({login: name, settings: { category: settings }}).find({ login: name }).write()
}

function updateUserSettings(name, settings) {
  if(!isUserExists(name))
    return false // TODO
  return db.get('users').find({ login: name }).assign({ settings: { category: settings }}).write()
}

module.exports = {
  getUserByName,
  isUserExists,
  getUserSettings,
  createUser,
  updateUserSettings,
}
