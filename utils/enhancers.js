'use strict'

function getUserCategoriesByStatus(categories, enabled) {
  return categories
    .filter((category) => category.enabled === enabled)
    .map((category) => category.name)
}

function filterAlertsByUserSettings(list, userCategories) {
  const enabledCategories = getUserCategoriesByStatus(userCategories, true)
  return list.filter(({ category }) => enabledCategories.indexOf(category) >= 0)
}

function addSuggestedAlert(list, userCategories, allAlerts) {
  const diabledCategories = getUserCategoriesByStatus(userCategories, false)

  const suggestedAlerts = allAlerts
    .filter(({ category, day }) => diabledCategories.indexOf(category) >= 0 && day == 0)
    .sort(() => Math.random() - 0.5) // array shuffle
    .slice(0, 3)
    .map((item) => Object.assign({}, item, { type: 'suggestedAlert' }))

  return list.concat(suggestedAlerts)
}

module.exports = {
  filterAlertsByUserSettings,
  addSuggestedAlert,
}
