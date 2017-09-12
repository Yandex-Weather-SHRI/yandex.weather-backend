import { getRandom } from 'utils'
import schema from 'mock/settings'


function getUserCategoriesByStatus(categories, enabled) {
  return categories
    .filter(category => category.enabled === enabled)
    .map(category => category.name)
}

export function filterAlertsByUserSettings(list, userCategories) {
  const enabledCategories = getUserCategoriesByStatus(userCategories, true)
  return list.filter(({ category }) => enabledCategories.indexOf(category) >= 0)
}

function getSuggestedAlert(item) {
  return { ...item, weight: -1, type: 'suggestedAlert' }
}

export function addSuggestedAlerts(list, userCategories, allAlerts) {
  const diabledCategories = getUserCategoriesByStatus(userCategories, false)

  if (list.length > 0) {
    const suggestedAlerts = allAlerts
      .filter(({ category, day }) => diabledCategories.indexOf(category) >= 0 && parseInt(day, 10) === 0)
      .sort(() => Math.random() - 0.5) // array shuffle
      .slice(0, 1)
      .map(getSuggestedAlert)

    return [...list, ...suggestedAlerts]
  }

  const randomCategories = Object.keys(schema).map((groupName) => {
    const categories = Object.keys(schema[groupName].categories)
    const randomCategoryIndex = getRandom(0, categories.length)
    return categories[randomCategoryIndex]
  })

  return allAlerts
    .filter(({ category, day }) => randomCategories.indexOf(category) >= 0 && parseInt(day, 10) === 0)
    .map(getSuggestedAlert)
}
