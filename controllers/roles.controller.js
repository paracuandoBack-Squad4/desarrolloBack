const RolesServices = require('../services/roles.services')

const RolesService = new RolesServices()

// const getAllRoles = async (request, response, next) => {
//   try {
//     let Roles = await RolesService.getAllCities()
//     return response.json({ results: Roles })
//   } catch (error) {
//     next(error)
//   }
// }
const getAllRoles = async (request, response) => {
  await RolesService.getAllCities()
    .then(data => response.status(200).json({ results: data }))
    .catch(err => response.status(400).json({ message: err.message }))

}



module.exports = { getAllRoles }