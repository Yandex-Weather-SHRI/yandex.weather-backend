'use strict'

const R = require('ramda')
const schema = require('../mock/settings')

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

function getCategoryGroup(category) {
  /* eslint-disable no-restricted-syntax */
  for (const groupName of Object.keys(schema)) {
    const categories = Object.keys(schema[groupName].categories)
    if (categories.includes(category)) {
      return groupName
    }
  }
  return null
}

function alertsAdapter(alertsList) {
  return alertsList.map((item) => {
    const [category, status,, day] = item.code.split(/_/)
    const categoryGroup = getCategoryGroup(category)
    return Object.assign({}, item, { category, categoryGroup, status, day, type: 'alert' })
  })
}

module.exports = {
  forecastAdapter,
  alertsAdapter,
}
