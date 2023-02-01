const express = require('express')
const router = express.Router()

const {
  getAllStates
} = require('../controllers/state.controllers')


router.get('/', getAllStates)



module.exports = router