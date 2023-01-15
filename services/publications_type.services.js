const models = require('../database/models')
const { Op } = require('sequelize')

class publicationsTypeServices {

  constructor() {

  }
  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    const { name } = query
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` }
    }
    options.distinct = true

    const publications = await models.Publications_type.findAndCountAll(options)
    return publications
  }

  async getPublicationTypeById(id) {
    let publicationType = await models.Publications_type.findByPk(id, { raw: true })
    return publicationType
  }




}
module.exports = publicationsTypeServices