'use strict'

/* eslint-disable no-console */
const chalk = require('chalk')


const log = {
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
  }
}

module.exports.log = log
