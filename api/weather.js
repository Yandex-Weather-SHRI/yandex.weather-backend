'use strict'

const R = require('ramda')
const fetch = require('request-promise-native')

const { locationMiddleware } = require('../middlewares/location')
const { forecastAdapter } = require('../utils/adapters')
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

      const categories = getUserCategories(login)
      
      if (!categories) {
        throw new Error('User not exists')
      }

      const enabledCategories = categories.reduce((acc, category) => {
        if (category.enabled) {
          acc.push(category.name)
        }
        return acc
      }, [])

      fetch(getRequestOptions(`http://api.weather.yandex.ru/v1/alerts?geoid=${request.geoid}`))
        .then((data) => {
          const alertsData = JSON.parse(data)
          const filteredAlerts = alertsData.concat(alertsMock).filter(({ code }) => {
            const [category] = code.split(/\_/)
            return enabledCategories.indexOf(category) >= 0
          })

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
