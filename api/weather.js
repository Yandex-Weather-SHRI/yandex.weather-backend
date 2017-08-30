'use strict'

const R = require('ramda')
const fetch = require('request-promise-native')

const { locationMiddleware } = require('../middlewares/location')
const { forecastAdapter } = require('../utils/adapters')
const { translateForecastData } = require('../utils/translators')


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
    fetch(getRequestOptions(`http://api.weather.yandex.ru/v1/alerts?geoid=${request.geoid}`))
      .then((data) => {
        response.json(
          JSON.parse(data)
        )
      })
      .catch(() => next('Can\'t connect to Yandex API'))
  })
}

module.exports.weatherAPI = weatherAPI
