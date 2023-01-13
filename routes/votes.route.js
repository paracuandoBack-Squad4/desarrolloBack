const express = require('express')
const router = express.Router()

const {
  addVote,
  getVotes,
  removeVote
} = require('../controllers/votes.controllers')


router.get('/', getVotes)
router.post('/', addVote)
router.get('/', removeVote)



module.exports = router