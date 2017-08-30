'use strict'

const {
  isUserExists,
  getUserCategories,
  createUserOrUpdateUserCategories,
} = require('../utils/db')


function isOneSettingValid(setting) {
  return typeof setting === 'object'
    && Object.keys(setting).length === 2
    && setting.hasOwnProperty('name')
    && setting.hasOwnProperty('enabled')
}

function isSettingsValid(settings) {
  return Array.isArray(settings) && settings.every(isOneSettingValid)
}

function userAPI(api) {
  api.post('/settings/categories', (request, response, next) => {
    try {
      const { login, items } = request.body
      const categories = items || []

      if (isSettingsValid(categories)) {
        const user = createUserOrUpdateUserCategories(login, categories)
        response.json(user.settings.categories)
      }
      else {
        throw new Error('Invalid settings')
      }
    }
    catch (error) {
      next(error)
    }
  })

  api.get('/settings/categories', (request, response, next) => {
    const login = request.query.login

    if (isUserExists(login)) {
      response.json(getUserCategories(login))
    }
    else {
      next('User doesn\'t exist')
    }
  })
}

module.exports.userAPI = userAPI
