import R from 'ramda'
import fetch from 'request-promise-native'
import { check, validationResult } from 'express-validator/check'

import { UserModel } from 'models/user'
import { UserNotFound, ValidationError } from 'errors'
import { locationMiddleware } from 'middlewares/location'
import { forecastAdapter, alertsAdapter, errorsAdapter } from 'utils/adapters'
import { filterAlertsByUserSettings, addSuggestedAlerts } from 'utils/enhancers'
import { translateForecastData } from 'utils/translators'
import alertsMock from 'mock/alerts'


function getRequestOptions(url) {
  return {
    url,
    headers: {
      'X-Yandex-API-Key': process.env.YANDEX_WEATHER_API_KEY,
    },
  }
}

export function weatherAPI(api) {
  api.get('/forecast', locationMiddleware, (request, response) => {
    Promise.all([
      fetch(getRequestOptions('https://api.weather.yandex.ru/v1/translations?lang=ru_RU')),
      fetch(getRequestOptions(`http://api.weather.yandex.ru/v1/forecast?geoid=${request.geoid}`)),
    ]).then(([translations, forecast]) => {
      const forecastData = R.compose(
        forecastAdapter,
        JSON.parse
      )(forecast)
      const translatedForecastData = R.compose(
        translateForecastData(forecastData),
        JSON.parse
      )(translations)
      response.json(translatedForecastData)
    })
  })

  api.get('/alerts', locationMiddleware, [
    check('login', 'Укажите логин').exists(),
  ], async (request, response, next) => {
    try {
      const errors = validationResult(request)

      if (!errors.isEmpty()) {
        throw new ValidationError(errorsAdapter(errors.mapped()))
      }

      const { login } = request.query
      const user = await UserModel.findOne({ login })

      if (!user) {
        throw new UserNotFound({ login })
      }

      const data = await fetch(getRequestOptions(`http://api.weather.yandex.ru/v1/alerts?geoid=${request.geoid}`))
      const alertsReal = JSON.parse(data)
      const parsedAlerts = alertsAdapter(alertsReal.concat(alertsMock))
      const filteredAlerts = R.compose(
        list => addSuggestedAlerts(list, user.settings.categories, parsedAlerts),
        list => filterAlertsByUserSettings(list, user.settings.categories)
      )(parsedAlerts)

      response.json(filteredAlerts)
    }
    catch (error) {
      next(error)
    }
  })
}
