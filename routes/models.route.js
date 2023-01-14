const express = require('express')
const routesUsers = require('./users.route')
const routesProfiles = require('./profiles.route')
const routesCountries = require('./countries.route')
const routesState = require('./state.route')
const routesCities = require('./city.route')
const routesPublications = require('./publications.route')
const routesPublicationsType = require('./publicatios_type.route')
const routesVotes = require('./votes.route')
const routesLogin = require('../auth/auth.route')


function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/login', routesLogin)
  router.use('/sign-up', routesUsers)
  router.use('/profiles', routesProfiles)
  router.use('/state', routesState)
  router.use('/countries', routesCountries)
  router.use('/city', routesCities)
  router.use('/publications', routesPublications)
  router.use('/publications_type', routesPublicationsType)
  router.use('/votes', routesVotes)

}

module.exports = routerModels