/* eslint-disable no-console */
import chalk from 'chalk'


export const log = {
  green(...rest) {
    console.log(chalk.green(...rest))
  },

  yellow(...rest) {
    console.log(chalk.yellow(...rest))
  },

  red(...rest) {
    console.log(chalk.red(...rest))
  },

  white(...rest) {
    console.log(chalk.white(...rest))
  },
}
