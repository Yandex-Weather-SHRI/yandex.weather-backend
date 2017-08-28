'use strict'

const { Router } = require('express')

const { weatherAPI } = require('./weather')


const api = Router()
weatherAPI(api)

module.exports.api = api
