'use strict'

const R = require('ramda')


function forecastAdapter(data) {
  return {
    fact: R.pick([
      'condition',
      'icon',
      'feels_like',
      'temp',
      'humidity',
      'pressure_mm',
      'wind_speed',
      'soil_temp',
    ], data.fact),
    geo_object: R.pick([
      'locality',
    ], data.geo_object)
  }
}

module.exports = {
  forecastAdapter,
}
