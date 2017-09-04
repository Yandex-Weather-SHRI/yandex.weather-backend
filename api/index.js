'use strict'

const { Router } = require('express')

const { weatherAPI } = require('./weather')
const { userAPI } = require('./user')
const { dbAPI } = require('./db')


const api = Router()
weatherAPI(api)
userAPI(api)
dbAPI(api)

module.exports.api = api
