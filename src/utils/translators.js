import R from 'ramda'


export function translateForecastData(data) {
  return dictionary => R.compose(
    R.assocPath(['fact', 'condition'], dictionary[data.fact.condition])
  )(data)
}
