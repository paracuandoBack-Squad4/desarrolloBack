
const models = require('../database/models')

class RolesServices {

  constructor() {
  }
  async getAllCities() {
    let Roles = await models.Roles.findAll()
    return Roles
  }
}

module.exports = RolesServices

