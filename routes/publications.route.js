const express = require('express')
const router = express.Router()

const {
  getPublications,
  addPublication,
  getPublication,
  removePublication,
  getVotesByPublication,
  addVotesByPublication,
  deleteVotesByPublication } = require('../controllers/publications.controllers')

router.get('/', getPublications)
router.post('/', addPublication)
router.get('/:publication_id', getPublication)
router.delete('/:publication_id', removePublication)
router.get('/:publication_id/vote', getVotesByPublication)
router.post('/:publication_id/vote', addVotesByPublication)
router.delete('/:publication_id/vote', deleteVotesByPublication)

module.exports = router