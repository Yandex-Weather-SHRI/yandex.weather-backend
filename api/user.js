'use strict'

const {
  isUserExists,
  createUser,
  updateUserSettings,
  getUserSettings,
} = require('../utils/db')

function isOneSettingValid(setting) {
  return typeof setting === "object" && Object.keys(setting).length === 2 && setting.hasOwnProperty('name') && setting.hasOwnProperty('enabled');
}

function isSettingsValid(settings) {
  return Array.isArray(settings) && settings.length > 0 && settings.every(isOneSettingValid)
}


function userAPI(api) {
  api.post('/settings/categories', (request, response, next) => {
    const login = request.body.login
    const settings = JSON.parse(request.body.items)

    let result;
    if(isSettingsValid(settings)) {
      if (isUserExists(login)) {
        result = updateUserSettings(login, settings)
      } else {
        result = createUser(login, settings)
      }
    } else {
      next('Invalid settings')
    }

    if(result) {
      response.json(result.settings.category)
    } else {
      next('Unhandled exception')
    }
  })

  api.get('/settings/categories', (request, response, next) => {
    const user = request.query.user

    if(isUserExists(user)) {
      response.json(getUserSettings(user))
    } else {
      next('User doesn\'t exist')
    }
  })
}

module.exports.userAPI = userAPI
