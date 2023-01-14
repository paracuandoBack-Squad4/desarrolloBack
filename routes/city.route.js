const express = require('express')
const router = express.Router()

const {
  getCityByState
} = require('../controllers/city.controllers')


router.get('/id', getCityByState)



module.exports = router