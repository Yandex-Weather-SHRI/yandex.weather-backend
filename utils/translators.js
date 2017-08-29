'use strict'

const R = require('ramda')


function translateForecastData(data) {
  return (dictionary) => {
    return R.compose(
      R.assocPath(['fact', 'condition'], dictionary[data.fact.condition])
    )(data)
  }
}

module.exports = {
  translateForecastData,
}
