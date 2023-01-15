
const models = require('../database/models')

class CitiesServices {

  constructor() {
  }
  async getAllCities() {
    let city = await models.City.findAll()
    return city
  }
}

module.exports = CitiesServices