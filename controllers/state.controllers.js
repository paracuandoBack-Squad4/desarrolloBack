const StatesServices = require('../services/state.services')

const StatesService = new StatesServices()

const getStateByCountry = async (request, response, next) => {
  try {
    let { id } = request.params
    let states = await StatesService.getCity(id)
    return response.json({ results: states })
  } catch (error) {
    next(error)
  }
}

module.exports = { getStateByCountry }