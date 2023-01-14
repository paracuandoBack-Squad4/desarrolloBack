const models = require('../database/models')

class publicationsTypeServices {

  constructor() {

  }

  async findAllPublicationsType() {
    let publicationType = await models.Publications_type().findAll()
    return publicationType
  }

}
module.exports = publicationsTypeServices