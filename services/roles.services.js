
const models = require('../database/models')

class RolesServices {

  constructor() {
  }
  async getAllCities() {
    let roles = await models.Roles.findAll()
    return roles
  }
}

module.exports = RolesServices

