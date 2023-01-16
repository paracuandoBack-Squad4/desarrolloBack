const { v4: uuid4 } = require('uuid')
const models = require('../database/models')
const { Op, where } = require('sequelize')
const { CustomError } = require('../utils/custom-error')


class PublicationsServices {

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
    const publications = await models.Publications.findAndCountAll(options)
    return publications
  }

  async createPublication(id, obj) {
    const transaction = await models.Publications.sequelize.transaction()
    try {
      let profileId = await models.Profiles.findOne({ where: { user_id: id } })
      let newPublication = await models.Publications.create({
        id: uuid4(),
        profile_id: profileId.id,
        publication_type_id: obj.publication_type_id,
        title: obj.title,
        description: obj.description,
        content: obj.content,
        picture: obj.picture,
        city_id: obj.city_id,
        image_url: obj.image_url
      }, { transaction })
      await transaction.commit()
      return newPublication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }


  async getProfileByUserId(id) {
    let profileId = await models.Profiles.findOne({ where: { user_id: id } })
    return profileId.id
  }

  async getPublicationOr404(id) {
    let publication = await models.Publications.findByPk(id)

    if (!publication) throw new CustomError('Not found Publication', 404, 'Not Found')

    return publication
  }

  async getAllPublications() {
    let publication = await models.Publications.findAll()
    return publication
  }


  async getPublication(id) {
    let publication = await models.Publications.findByPk(id, { raw: true })
    return publication
  }

  async removePublication(id) {
    const transaction = await models.Publications.sequelize.transaction()
    try {
      let publication = await models.Publications.findByPk(id)

      if (!publication) throw new CustomError('Not found publication', 404, 'Not Found')

      await publication.destroy({ transaction })

      await transaction.commit()

      return publication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  async getVotesByPublicationId(id) {
    const votes = await models.Votes.findAll({ where: { publication_id: id } })
    return votes
  }

  async postVotesByPublication(id, publicationId) {
    const transaction = await models.Votes.sequelize.transaction()
    try {
      const profileId = await models.Profiles.findOne({ where: { user_id: id } })
      let vote = await models.Votes.create({
        publication_id: publicationId,
        profile_id: profileId.id
      }, { transaction })
      await transaction.commit()
      return vote
    }
    catch (error) {
      await transaction.rollback()
    }
  }
  async removeVotesByPublication(id, publicationId) {
    const transaction = await models.Votes.sequelize.transaction()
    try {
      const profileId = await models.Profiles.findOne({ where: { user_id: id } })
      let vote = await models.Votes.destroy({
        where: {
          publication_id: publicationId,
          profile_id: profileId.id
        }
      }, { transaction })
      await transaction.commit()
      return vote
    }
    catch (error) {
      await transaction.rollback()
    }
  }

  async findByPublicationAndProfile(id, publicationId) {
    const profileId = await models.Profiles.findOne({ where: { user_id: id } })
    const result = await models.Votes.findOne({
      where: {
        profile_id: profileId.id,
        publication_id: publicationId
      }
    })
    return result
  }


}

module.exports = PublicationsServices