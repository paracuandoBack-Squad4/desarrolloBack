const Countries = require('../database/models/countries')

class CountriesServices {

  constructor() {
  }
  async getAllCountries() {
    let country = await Countries().findAll()
    return country
  }
}

module.exports = CountriesServices