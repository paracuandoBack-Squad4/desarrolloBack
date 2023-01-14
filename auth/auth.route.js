const express = require('express')
const postLogin = require('./auth.services')
const routes = express.Router()

routes.post('/', postLogin)

module.exports = routes