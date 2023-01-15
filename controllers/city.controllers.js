const CitiesServices = require('../services/city.services')

const CitiesService = new CitiesServices()

const getAllCities = (request, response) => {
  CitiesService.getAllCities()
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({ message: err.message }))

}

// const getAllCities = async (request, response, next) => {
//   try {
//     let cities = await CitiesService.getAllCities()
//     return response.json({ results: cities })
//   } catch (error) {
//     next(error)
//   }





module.exports = { getAllCities }