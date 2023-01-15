const PublicationsServices = require('../services/publications.services')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')


const publicationsServices = new PublicationsServices()

const getPublications = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let users = await publicationsServices.findAndCount(query)
    const results = getPagingData(users, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const addPublication = async (request, response, next) => {
  try {
    let { profile_id, publication_type_id, title, description, content, picture, city_id, image_url } = request.body
    let publication = await publicationsServices.createPublication({ profile_id, publication_type_id, title, description, content, picture, city_id, image_url })
    return response.status(201).json({ results: publication })
  } catch (error) {
    next(error)
  }
}

const getPublication = async (request, response, next) => {
  try {
    let id = request.params.publication_id
    let publication = await publicationsServices.getPublicationOr404(id)
    return response.json({ results: publication })
  } catch (error) {
    next(error)
  }
}
const getVotesByPublication = async (request, response, next) => {
  try {
    let id = request.params.publication_id
    let publication = await publicationsServices.getVotesByPublicationId(id)
    return response.json({ results: publication })
  } catch (error) {
    next(error)
  }
}

const removePublication = async (request, response, next) => {
  try {
    let id = request.params.publication_id
    let user = await publicationsServices.removePublication(id)
    return response.json({ results: user, message: 'removed' })
  } catch (error) {
    next(error)
  }
}


module.exports = {
  addPublication,
  getPublications,
  getPublication,
  removePublication,
  getVotesByPublication
}