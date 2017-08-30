'use strict'

const geoip = require('geoip-lite')
const fetch = require('request-promise-native')


function locationMiddleware(request, response, next) {
  const geo = geoip.lookup(request.ip)
  const lat = geo ? geo.ll[0] : '55.7446189'
  const lon = geo ? geo.ll[1] : '37.6227287'
  const options = {
    url: `http://api.weather.yandex.ru/v1/geo-object?lat=${lat}&lon=${lon}`,
    headers: {
      'X-Yandex-API-Key': process.env.YANDEX_WEATHER_API_KEY,
    },
  }

  fetch(options)
    .then((data) => {
      const json = JSON.parse(data)
      request.geoid = json.locality.id
      next()
    })
    .catch(() => next(new Error('Can\'t connect to Yandex API')))
}

module.exports.locationMiddleware = locationMiddleware
