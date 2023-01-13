const express = require('express')
const router = express.Router()

const {
  addProfile,
  updateProfile } = require('../controllers/profiles.controllers')


router.post('/', addProfile)
router.patch('/:id', updateProfile)


module.exports = router