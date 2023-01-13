const express = require('express')
const routesUsers = require('./users.route')
const routesProfiles = require('./profiles.route')
const routesCountries = require('./countries.route')
const routesCities = require('./cities.route')
const routesPublications = require('./publications.route')
const routesPublicationsType = require('./publicatios_type.route')
const routesVotes = require('./votes.route')

function routerModels(app) {
  const router = express.Router()

  app.use('/api/v1', router)

  router.use('/users', routesUsers)
  router.use('/profiles', routesProfiles)
  router.use('/countries', routesCountries)
  router.use('/cities', routesCities)
  router.use('/publications', routesPublications)
  router.use('/publicationsType', routesPublicationsType)
  router.use('/votes', routesVotes)







  // other models here
}

module.exports = routerModels