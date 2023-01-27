const express = require('express')
const router = express.Router()
const isAdmin = require('../middlewares/isAdmin.middleware')
const {
  getAllTags,
  addTag,
  updateTag,
  deleteTag
} = require('../controllers/tags.controllers')


router.get('/', getAllTags)
router.post('/', addTag)
router.put('/:tag_id', updateTag)
router.delete('/:tag_id', deleteTag)


module.exports = router