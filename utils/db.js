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

function getUserCategories(name) {
  return isUserExists(name) ? getUserByName(name).settings.categories : false
}

function createUser(name, categories) {
  if(isUserExists(name))
    return false // TODO
  return db.get('users').push({login: name, settings: { categories }}).find({ login: name }).write()
}

function updateUserCategories(name, categories) {
  if(!isUserExists(name))
    return false // TODO
  return db.get('users').find({ login: name }).assign({ settings: { categories }}).write()
}

module.exports = {
  getUserByName,
  isUserExists,
  getUserCategories,
  createUser,
  updateUserCategories,
}
