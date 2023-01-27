const express = require('express')
const {postLogin, postRecoveryToken, patchPassword} = require('./auth.services')
const routes = express.Router()

routes.post('/login', postLogin)
routes.post('/recovery-password', postRecoveryToken)
routes.patch('/change-password/:user_id', patchPassword)

module.exports = routes