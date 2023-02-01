const express = require('express')
const { getPublicationsType, getPublicationTypeById } = require('../controllers/publications_type.controllers')
const router = express.Router()




router.get('/', getPublicationsType)
router.get('/:publication_type_id', getPublicationTypeById)



module.exports = router