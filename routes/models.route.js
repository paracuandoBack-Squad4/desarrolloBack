const express = require('express')
const routesUsers = require('./users.route')
const routesCountries = require('./countries.route')
const routesState = require('./state.route')
const routesCities = require('./city.route')
const routesPublications = require('./publications.route')
const routesPublicationsType = require('./publications_type.route')
const routesLogin = require('../auth/auth.route')
const routerRoles = require('./roles.route')
const passport = require('passport')
const { getUsers, addUser } = require('../controllers/users.controllers')
require('../middlewares/auth.middleware')(passport)



function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/login', routesLogin)
  router.get('/users', getUsers)
  router.post('/sign-up', addUser)
  router.use('/user', passport.authenticate('jwt', { session: false }), routesUsers)
  router.use('/states', passport.authenticate('jwt', { session: false }), routesState)
  router.use('/countries', passport.authenticate('jwt', { session: false }), routesCountries)
  router.use('/cities', passport.authenticate('jwt', { session: false }), routesCities)
  router.use('/publications', passport.authenticate('jwt', { session: false }), routesPublications)
  router.use('/publications_types', passport.authenticate('jwt', { session: false }), routesPublicationsType)
  router.use('/roles', passport.authenticate('jwt', { session: false }), routerRoles)
}

module.exports = routerModels