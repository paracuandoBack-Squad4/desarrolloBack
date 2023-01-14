const models = require('../database/models')

class StateServices {

  constructor() {
  }
  async getAllStates(id) {
    let state = await models.State().findAll({
      where: {
        country_id: id
      }
    })
    return state
  }
}

module.exports = StateServices