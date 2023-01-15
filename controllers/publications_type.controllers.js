const publicationsTypesServices = require('../services/publications_type.services')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const publicationTypesService = new publicationsTypesServices

const getPublicationsType = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let publicationType = await publicationTypesService.findAndCount(query)
    const results = getPagingData(publicationType, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}
const getPublicationTypeById = async (request, response, next) => {
  try {
    const id = request.params.publication_type_id
    let publicationType = await publicationTypesService.getPublicationTypeById(id)
    return response.status(200).json({ results: publicationType })
  } catch (error) {
    next(error)
  }
}

module.exports = { getPublicationsType, getPublicationTypeById }