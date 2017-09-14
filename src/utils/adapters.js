import R from 'ramda'

import schema from '../mock/settings'


export function forecastAdapter(data) {
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
    ], data.geo_object),
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

function getWeightByStatus(status) {
  const weights = {
    best: 0,
    ok: 1,
    bad: 2,
  }

  if (weights[status] !== undefined) {
    return weights[status]
  }

  return -1
}

export function alertsAdapter(alertsList) {
  return alertsList.map((item) => {
    const [category, status,, day] = item.code.split(/_/)
    const categoryGroup = getCategoryGroup(category)
    const weight = getWeightByStatus(status)
    return R.compose(
      R.merge({ category, categoryGroup, status, weight, day, type: 'alert' }),
      R.pick(['id', 'text'])
    )(item)
  })
}

export function errorsAdapter(errors) {
  return Object.keys(errors).reduce((acc, field) => (
    [...acc, { field, message: errors[field].msg, value: errors[field].value }]
  ), [])
}
