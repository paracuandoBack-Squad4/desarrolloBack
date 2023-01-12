const CountriesServices = require('../services/countries.services')


const CountriesService = new CountriesServices()
const getCountries = async (request, response, next) => {
  try {
    let countries = await CountriesService.createUser()
    return response.status(201).json({ results: countries })
  } catch (error) {
    next(error)
  }
}

module.exports = { getCountries }