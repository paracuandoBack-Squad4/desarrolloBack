const CitiesServices = require('../services/city.services')

const CitiesService = new CitiesServices()

const getAllCities = async (request, response, next) => {
  try {
    let cities = await CitiesService.getAllCities()
    return response.json({ results: cities })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllCities }