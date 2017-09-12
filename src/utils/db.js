import low from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'
import fetch from 'request-promise-native'

import { config } from 'config/config'
import { defaultCategorySettings } from 'utils/settings'


const adapter = new FileSync('db.json')
const db = low(adapter)

fetch(config.exportDataBaseURL)
  .then((data) => {
    const json = JSON.parse(data)
    db.defaults(json)
      .write()
  })
  .catch(() => {
    db.defaults({ users: [] })
      .write()
  })


export function getUserByLogin(login) {
  return db.get('users')
    .find({ login })
    .cloneDeep()
    .value()
}

export function isUserExists(login) {
  return Boolean(getUserByLogin(login))
}

export function getUserCategories(login) {
  return isUserExists(login) ? getUserByLogin(login).settings.categories : null
}

export function createUserOrUpdateUserCategories(login, categories) {
  if (isUserExists(login)) {
    const user = db.get('users').find({ login })

    if (categories.length > 0) {
      return user
        .assign({ settings: { categories } })
        .write()
    }

    return user.value()
  }

  const userCategories = categories.length ? categories : defaultCategorySettings

  return db.get('users')
    .push({ login, settings: { categories: userCategories } })
    .find({ login })
    .write()
}

