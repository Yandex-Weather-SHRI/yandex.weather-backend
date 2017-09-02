'use strict'

const express = require('express')
const path = require('path')


function dbAPI(api) {
  api.use(express.static(__dirname + "../db.json"));

  api.get('/export_db', (request, response) => {
    response.sendFile(path.resolve(__dirname, '..', 'db.json'))
  })
}

module.exports.dbAPI = dbAPI
