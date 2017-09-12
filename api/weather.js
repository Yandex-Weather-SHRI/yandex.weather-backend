'use strict'

const R = require('ramda')
const fetch = require('request-promise-native')

const { locationMiddleware } = require('../middlewares/location')
const { forecastAdapter, alertsAdapter,  } = require('../utils/adapters')
const { filterAlertsByUserSettings, addSuggestedAlerts } = require('../utils/enhancers')
const { translateForecastData } = require('../utils/translators')
const { getUserCategories } = require('../utils/db')
const alertsMock = require('../mock/alerts')


function getRequestOptions(url) {
  return {
    url,
    headers: {
      'X-Yandex-API-Key': process.env.YANDEX_WEATHER_API_KEY,
    },
  }
}

function weatherAPI(api) {
  api.get('/forecast', locationMiddleware, (request, response, next) => {
    Promise.all([
      fetch(getRequestOptions('https://api.weather.yandex.ru/v1/translations?lang=ru_RU')),
      fetch(getRequestOptions(`http://api.weather.yandex.ru/v1/forecast?geoid=${request.geoid}`))
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

  api.get('/alerts', locationMiddleware, (request, response, next) => {
    try {
      const { login } = request.query

      if (!login) {
        throw new Error('Invalid login parameter')
      }

      const userCategories = getUserCategories(login)
      
      if (!userCategories) {
        throw new Error('User not exists')
      }

      fetch(getRequestOptions(`http://api.weather.yandex.ru/v1/alerts?geoid=${request.geoid}`))
        .then((data) => {
          const alertsReal = JSON.parse(data)
          const parsedAlerts = alertsAdapter(alertsReal.concat(alertsMock))
          const filteredAlerts = R.compose(
            (list) => addSuggestedAlerts(list, userCategories, parsedAlerts),
            (list) => filterAlertsByUserSettings(list, userCategories)
          )(parsedAlerts)

          response.json(filteredAlerts)
        })
        .catch(() => next(new Error('Can\'t connect to Yandex API')))
    }
    catch (error) {
      next(error)
    }
  })
}

module.exports.weatherAPI = weatherAPI
