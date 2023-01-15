const StatesServices = require('../services/state.services')

const StatesService = new StatesServices()

const getAllStates = async (request, response, next) => {
  try {
    let states = await StatesService.getAllStates()
    return response.json({ results: states })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllStates }