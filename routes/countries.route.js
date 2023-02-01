const express = require('express')
const router = express.Router()

const {
  getAllCountries
} = require('../controllers/countries.controllers')


router.get('/', getAllCountries)



module.exports = router