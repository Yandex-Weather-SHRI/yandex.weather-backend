const groupsSchema = require('../mock/settings')

const defaultCategorySettings = Object.keys(groupsSchema).reduce((acc, groupName) => {
  const { categories } = groupsSchema[groupName]
  const categoriesList = Object.keys(categories).map((category) => {
    return { name: category, enabled: false, group: groupName }
  })
  return acc.concat(categoriesList)
}, [])

module.exports = {
  groupsSchema,
  defaultCategorySettings,
}

