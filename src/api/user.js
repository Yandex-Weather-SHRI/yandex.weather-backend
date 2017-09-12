import { isUserExists, getUserCategories, createUserOrUpdateUserCategories } from 'utils/db'
import { groupsSchema, defaultCategorySettings, onboardingCards } from 'utils/settings'


function isOneSettingValid(setting) {
  return typeof setting === 'object'
    && Object.keys(setting).length === 3
    && Object.prototype.hasOwnProperty.call(setting, 'name')
    && Object.prototype.hasOwnProperty.call(setting, 'enabled')
    && Object.prototype.hasOwnProperty.call(setting, 'group')
}

function isSettingsValid(settings) {
  return Array.isArray(settings) && settings.every(isOneSettingValid)
}

export function userAPI(api) {
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

  api.get('/settings/schema', (request, response) => {
    response.json(groupsSchema)
  })

  api.get('/settings/default', (request, response) => {
    response.json(defaultCategorySettings)
  })

  api.get('/settings/onboarding_cards', (request, response) => {
    response.json(onboardingCards)
  })

  api.get('/settings/categories', (request, response, next) => {
    const login = request.query.login

    if (isUserExists(login)) {
      response.json(getUserCategories(login))
    }
    else {
      next(new Error('User doesn\'t exist'))
    }
  })
}
