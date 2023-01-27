const { response } = require('express')
const TagsServices = require('../services/tags.services')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const tagsServices = new TagsServices()

const getAllTags = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '4')
    query.limit = limit
    query.offset = offset

    let tags = await tagsServices.findAndCount(query)
    const results = getPagingData(tags, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const addTag = async (request, response) => {
  let { name } = request.body
  if (name) {
    await tagsServices.createTag({ name })
      .then(data => response.status(201).json(data))
      .catch(err => response.status(400).json({ message: err.message }))
  }
  else {
    response.status(400).json({
      message: 'All fields are required', fields: {
        name: 'String'
      }
    })
  }
}

const updateTag = async (request, response) => {
  let id = request.params.id
  let { name } = request.body
  if (name) {
    await tagsServices.updateTag(id, { name })
      .then(data => response.status(200).json(data))
      .catch(err => response.status(400).json({
        message: err.message, fiels: {
          name: 'STRING'
        }
      }))
  }
}

const deleteTag = async (request, require) => {
  let id = request.params.id
  if(id){
    await tagsServices.removeTag(id)
    .then(data => response.status(200).json(data, {message: 'Tag eliminated'}))
    .catch(err => response.status(400).json({message: err.message}))
  }
}

module.exports = {
  getAllTags,
  addTag,
  updateTag,
  deleteTag
}