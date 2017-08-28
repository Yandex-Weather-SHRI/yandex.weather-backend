'use strict'

const R = require('ramda')
const fetch = require('request-promise-native')

const { forecastAdapter } = require('../utils/adapters')


function getRequestOptions(url) {
  return {
    url,
    headers: {
      'X-Yandex-API-Key': process.env.YANDEX_WEATHER_API_KEY,
    },
  }
}

function weatherAPI(api) {
  api.get('/translations', (request, response, next) => {
    fetch(getRequestOptions(`https://api.weather.yandex.ru/v1/translations?lang=${request.query.lang}`))
      .then((data) => {
        response.json(
          JSON.parse(data)
        )
      })
      .catch(next)
  })

  api.get('/forecast', (request, response, next) => {
    fetch(getRequestOptions(`http://api.weather.yandex.ru/v1/forecast?geoid=${request.geoid}`))
      .then((data) => {
        response.json(
          R.compose(
            forecastAdapter,
            JSON.parse
          )(data)
        )
      })
      .catch(next)
  })

  api.get('/alerts', (request, response, next) => {
    fetch(getRequestOptions(`http://api.weather.yandex.ru/v1/alerts?geoid=${request.geoid}`))
      .then((data) => {
        response.json(
          JSON.parse(data)
        )
      })
      .catch(next)
  })
}

module.exports.weatherAPI = weatherAPI
