
const models = require('../database/models')

class CitiesServices {

  constructor() {
  }
  async getCity(id) {
    let city = await models.City().findAll({
      where: {
        country_id: id
      }
    })
    return city
  }
}

module.exports = CitiesServices