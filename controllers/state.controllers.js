const StatesServices = require('../services/state.services')

const StatesService = new StatesServices()

// const getAllStates = async (request, response, next) => {
//   try {
//     let states = await StatesService.getAllStates()
//     return response.json({ results: states })
//   } catch (error) {
//     next(error)
//   }
// }
const getAllStates = async (request, response) => {

  await StatesService.getAllStates()
    .then(data => response.status(200).json(data))
    .catch(err => response.status(400).json({ message: err.message }))


}

module.exports = { getAllStates }