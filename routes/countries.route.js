const express = require('express')
const router = express.Router()

const {
  getCountries
} = require('../controllers/countries.controllers')


router.get('/', getCountries)



module.exports = router