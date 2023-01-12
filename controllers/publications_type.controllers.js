const publicationsTypesServices = require('../services/publications_type.services')

const publicationTypesService = new publicationsTypesServices

const getPublicationsType = async (request, response, next) => {
  try {
    let publications = await publicationTypesService.findAllPublicationsType()
    return response.status(200).json({ results: publications })
  } catch (error) {
    next(error)
  }
}

module.exports = { getPublicationsType }