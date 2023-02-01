const CountriesServices = require('../services/countries.services')


const CountriesService = new CountriesServices()
const getAllCountries = async (request, response, next) => {
  try {
    let countries = await CountriesService.getAllCountries()
    return response.status(201).json({ results: countries })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllCountries }