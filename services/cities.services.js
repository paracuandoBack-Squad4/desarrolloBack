const Cities = require('../database/models/city')

class CitiesServices {

  constructor() {
  }
  async getCity(id) {
    let city = await Cities().findAll({
      where: {
        country_id: id
      }
    })
    return city
  }
}

module.exports = CitiesServices