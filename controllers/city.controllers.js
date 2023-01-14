const CitiesServices = require('../services/cities.services')

const CitiesService = new CitiesServices()

const getCityByCountry = async (request, response, next) => {
  try {
    let { id } = request.params
    let cities = await CitiesService.getCity(id)
    return response.json({ results: cities })
  } catch (error) {
    next(error)
  }
}

module.exports = { getCityByCountry }