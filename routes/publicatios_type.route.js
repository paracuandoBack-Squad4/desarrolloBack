const express = require('express')
const router = express.Router()

const {
  getPublicationsType
} = require('../controllers/publications_type.controllers')


router.get('/', getPublicationsType)



module.exports = router