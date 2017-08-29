'use strict'

const {
  isUserExists,
  createUser,
  updateUserCategories,
  getUserCategories,
} = require('../utils/db')

function isOneSettingValid(setting) {
  return typeof setting === 'object' && Object.keys(setting).length === 2 &&
    setting.hasOwnProperty('name') && setting.hasOwnProperty('enabled');
}

function isSettingsValid(settings) {
  return Array.isArray(settings) && settings.length > 0 && settings.every(isOneSettingValid)
}


function userAPI(api) {
  api.post('/settings/categories', (request, response, next) => {
    const login = request.body.login
    const settings = JSON.parse(request.body.items)

    let user;
    if(isSettingsValid(settings)) {
      if (isUserExists(login)) {
        user = updateUserCategories(login, settings)
      } else {
        user = createUser(login, settings)
      }
    } else {
      next('Invalid settings')
    }

    if(user) {
      response.json(user.settings.categories)
    } else {
      next('Unhandled exception')
    }
  })

  api.get('/settings/categories', (request, response, next) => {
    const login = request.query.login

    if(isUserExists(login)) {
      response.json(getUserCategories(login))
    } else {
      next('User doesn\'t exist')
    }
  })
}

module.exports.userAPI = userAPI
