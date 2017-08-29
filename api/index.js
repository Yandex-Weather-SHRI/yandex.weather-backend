'use strict'

const { Router } = require('express')

const { weatherAPI } = require('./weather')
const { userAPI } = require('./user')


const api = Router()
weatherAPI(api)
userAPI(api)

module.exports.api = api
