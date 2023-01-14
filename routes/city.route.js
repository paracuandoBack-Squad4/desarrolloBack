const express = require('express')
const router = express.Router()

const {
  getCityByCountry
} = require('../controllers/city.controllers')


router.get('/id', getCityByCountry)



module.exports = router