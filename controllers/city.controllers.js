const CitiesServices = require('../services/city.services')

const CitiesService = new CitiesServices()

const getCityByState = async (request, response, next) => {
  try {
    let { id } = request.params
    let cities = await CitiesService.getCity(id)
    return response.json({ results: cities })
  } catch (error) {
    next(error)
  }
}

module.exports = { getCityByState }