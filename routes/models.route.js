const express = require('express')
const routesUsers = require('./users.route')
const routesProfiles = require('./profiles.route')
const routesCountries = require('./countries.route')
const routesCities = require('./cities.route')
const routesPublications = require('./publications.route')
const routesPublicationsType = require('./publicatios_type.route')
const routesVotes = require('./votes.route')
const routesLogin = require('../auth/auth.route')
const passport = require('passport')


function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/login', routesLogin)
  router.use('/sign-up', routesUsers)
  router.use('/profiles', routesProfiles)
  router.use('/countries', routesCountries)
  router.use('/cities', routesCities)
  router.use('/publications', routesPublications)
  router.use('/publicationsType', routesPublicationsType)
  router.use('/votes', routesVotes)

}

module.exports = routerModels