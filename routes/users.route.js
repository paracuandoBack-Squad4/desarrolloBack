const express = require('express')
const router = express.Router()

const {
  getUsers,
  getUser,
  updateUser,
  myPublications,
  myVotes } = require('../controllers/users.controllers')

router.get('/', getUsers)
router.get('/:user_id', getUser)
router.patch('/:user_id', updateUser)
router.get('/:id/publications', myPublications)
router.get('/:id/votes', myVotes)

module.exports = router