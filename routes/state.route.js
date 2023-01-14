const express = require('express')
const router = express.Router()

const {
  getStateByCountry
} = require('../controllers/state.controllers')


router.get('/id', getStateByCountry)



module.exports = router