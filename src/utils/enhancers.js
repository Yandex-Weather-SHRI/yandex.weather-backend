function getUserCategoriesByStatus(categories, enabled) {
  return categories
    .filter(category => category.enabled === enabled)
    .map(category => category.name)
}

export function filterAlertsByUserSettings(list, userCategories) {
  const enabledCategories = getUserCategoriesByStatus(userCategories, true)
  return list.filter(({ category }) => enabledCategories.indexOf(category) >= 0)
}

export function addSuggestedAlerts(list, userCategories, allAlerts) {
  const diabledCategories = getUserCategoriesByStatus(userCategories, false)

  const suggestedAlerts = allAlerts
    .filter(({ category, day }) => diabledCategories.indexOf(category) >= 0 && parseInt(day, 10) === 0)
    .sort(() => Math.random() - 0.5) // array shuffle
    .slice(0, 3)
    .map(item => ({ ...item, weight: -1, type: 'suggestedAlert' }))

  return [...list, ...suggestedAlerts]
}
