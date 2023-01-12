const publicationsType = require('../database/models/publications_type')

class publicationsTypeServices {

  constructor() {

  }

  async findAllPublicationsType() {
    let publicationType = await publicationsType().findAll()
    return publicationType
  }

}
module.exports = publicationsTypeServices