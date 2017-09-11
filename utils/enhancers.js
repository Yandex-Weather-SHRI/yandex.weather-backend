'use strict'

function filterAlertsByUserSettings(list, userCategories) {
  const enabledCategories = userCategories.reduce((acc, category) => {
    if (category.enabled) {
      acc.push(category.name)
    }
    return acc
  }, [])

  return list.filter(({ category }) => {
    return enabledCategories.indexOf(category) >= 0
  })
}

function addDisabledAlerts(list, userCategories, allAlerts) {
  const diabledCategories = userCategories.reduce((acc, category) => {
    if (!category.enabled) {
      acc.push(category.name)
    }
    return acc
  }, [])

  const suggestedAlerts = allAlerts
    .filter(({ category, day }) => {
      return diabledCategories.indexOf(category) >= 0 && day == 0
    })
    .slice(0, 3)
    .map((item) => {
      return Object.assign({}, item, { type: 'suggestedAlert' })
    })

  return list.concat(suggestedAlerts)
}

module.exports = {
  filterAlertsByUserSettings,
  addDisabledAlerts,
}
