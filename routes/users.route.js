const express = require('express')
const router = express.Router()

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  myPublications,
  myVotes } = require('../controllers/users.controllers')

router.get('/user', getUsers)
router.post('/sign-up', addUser)
router.get('/user/:user_id', getUser)
router.patch('/user/:user_id', updateUser)
router.get('/user/:id/publications', myPublications)
router.get('/user/:id/votes', myVotes)

module.exports = router