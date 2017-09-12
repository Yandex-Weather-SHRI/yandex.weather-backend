import groupsSchema from 'mock/settings'


export { default as onboardingCards } from 'mock/onboarding'
export { groupsSchema }

export const defaultCategorySettings = Object.keys(groupsSchema).reduce((acc, groupName) => {
  const { categories } = groupsSchema[groupName]
  const categoriesList = Object.keys(categories).map(category => (
    { name: category, enabled: false, group: groupName }
  ))
  return [...acc, ...categoriesList]
}, [])

