const models = require('../database/models')

class StateServices {

  constructor() {
  }
  async getAllStates() {
    let state = await models.State.findAll()
    return state
  }
}

module.exports = StateServices