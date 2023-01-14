const models = require('../database/models')

class CountriesServices {

  constructor() {
  }
  async getAllCountries() {
    let country = await models.Countries().findAll()
    return country
  }
}

module.exports = CountriesServices