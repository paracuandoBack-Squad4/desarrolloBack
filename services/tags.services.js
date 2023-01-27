const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const models = require('../database/models/index')


class TagsService {

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

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const tags = await models.Tags.findAndCountAll(options)
    return tags
  }

  async createTag(obj) {
    const transaction = await models.Tags.sequelize.transaction()
    try {
      const newTag = await models.Tags.create({
        id: obj.id,
        name: obj.name
      }, { transaction })
      await transaction.commit()
      return newTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  //Return Instance if we do not converted to json (or raw:true)
  async getTagOr404(id) {
    let tag = await models.Tags.findByPk(id)

    if (!tag) throw new CustomError('Not found Tag', 404, 'Not Found')

    return tag
  }

  async updateTag(id, obj) {
    const transaction = await models.Tags.sequelize.transaction()
    try {
      let tag = await models.Tags.findByPk(id)
      if (!tag) throw new CustomError('Not found tag', 404, 'Not Found')

      let updatedTag = await tag.update({
        name: obj.name
      }, { transaction })

      await transaction.commit()
      return updatedTag
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }


  async removeTag(id) {
    const transaction = await models.sequelize.transaction();
    try {
      let tag = await models.Tags.findByPk(id)

      if (!tag) throw new CustomError('Not found tag', 404, 'Not Found')

      await tag.destroy({ transaction })

      await transaction.commit();

      return tag
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  }


}


module.exports = TagsService