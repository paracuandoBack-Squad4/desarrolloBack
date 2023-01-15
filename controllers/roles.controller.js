const RolesServices = require('../services/roles.services')

const RolesService = new RolesServices()

const getAllRoles = async (request, response, next) => {
  try {
    let roles = await RolesService.getAllCities()
    return response.json({ results: roles })
  } catch (error) {
    next(error)
  }
}

module.exports = { getAllRoles }