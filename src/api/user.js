import R from 'ramda'
import { check, validationResult } from 'express-validator/check'

import { groupsSchema, defaultCategoriesSettings, onboardingCards } from 'utils/settings'
import { errorsAdapter } from 'utils/adapters'
import { UserModel } from 'models/user'
import { UserNotFound, ValidationError } from 'errors'


export function userAPI(api) {
  api.get('/settings/categories', async (request, response, next) => {
    try {
      const login = request.query.login
      const user = await UserModel.findOne({ login })

      if (!user) {
        throw new UserNotFound({ login })
      }

      response.json(user.settings.categories)
    }
    catch (error) {
      next(error)
    }
  })

  api.post('/settings/categories', [
    check('login', 'Укажите логин').exists(),
  ], async (request, response, next) => {
    try {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
        throw new ValidationError(errorsAdapter(errors.mapped()))
      }

      const { login, items = [] } = request.body
      let user = await UserModel.findOne({ login })

      if (!user) {
        const categories = R.unionWith(R.eqBy(R.prop('name')), items, defaultCategoriesSettings)
        const newUserData = { login, settings: { categories } }
        user = await UserModel.create(newUserData)
        return response.status(201).json(user.settings.categories)
      }

      if (items.length === 0) {
        return response.json(user.settings.categories)
      }

      const categories = R.unionWith(R.eqBy(R.prop('name')), items, user.settings.categories)
      const nextUserData = Object.assign(user, { settings: { categories } })
      user = await nextUserData.save()
      return response.status(202).json(user.settings.categories)
    }
    catch (error) {
      return next(error)
    }
  })

  api.get('/settings/schema', (request, response) => {
    response.json(groupsSchema)
  })

  api.get('/settings/default', (request, response) => {
    response.json(defaultCategoriesSettings)
  })

  api.get('/settings/onboarding_cards', (request, response) => {
    response.json(onboardingCards)
  })
}
