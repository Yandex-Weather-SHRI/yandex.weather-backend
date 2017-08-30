const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')


const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: [] })
  .write()

function getUserByLogin(login) {
  return db.get('users')
    .find({ login })
    .cloneDeep()
    .value()
}

function isUserExists(login) {
  return Boolean(getUserByLogin(login))
}

function getUserCategories(login) {
  return isUserExists(login) ? getUserByLogin(login).settings.categories : false
}

function createUserOrUpdateUserCategories(login, categories) {
  if (isUserExists(login)) {
    const user = db.get('users').find({ login })

    if (categories.length) {
      return user
        .assign({ settings: { categories }})
        .write()
    }

    return user.value()
  }
  else {
    return db.get('users')
      .push({ login, settings: { categories }})
      .find({ login })
      .write()
  }
}

module.exports = {
  getUserByLogin,
  isUserExists,
  getUserCategories,
  createUserOrUpdateUserCategories,
}
