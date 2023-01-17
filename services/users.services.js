const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const { hash } = require('../utils/Crypto')
const models = require('../database/models/index')
const { v4: uuid4 } = require('uuid')


class UsersService {

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

    const users = await models.Users.findAndCountAll(options)
    return users
  }

  async createUser(obj) {
    const transaction = await models.Users.sequelize.transaction()
    try {
      const newUser = await models.Users.create({
        id: uuid4(),
        first_name: obj.first_name,
        last_name: obj.last_name,
        email: obj.email,
        username: obj.username,
        password: hash(obj.password),
      }, { transaction })
      const newProfile = await models.Profiles.create({
        id: uuid4(),
        user_id: newUser.id,
        image_url: obj.profile.image_url,
        code_phone: obj.profile.code_phone,
        phone: obj.profile.phone
      }, { transaction })
      await transaction.commit()
      return { newUser, newProfile }
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }


  //Return Instance if we do not converted to json (or raw:true)
  async getUserOr404(id) {
    let user = await models.Users.findByPk(id)

    if (!user) throw new CustomError('Not found User', 404, 'Not Found')

    return user
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getUser(id) {
    let user = await models.Users.findByPk(id, { raw: true })
    return user
  }

  async getUserByEmail(email) {
    let user = await models.Users.findOne({
      where: {
        email: email
      }
    })
    return user
  }

  async updateUser(id, obj) {
    const transaction = await models.Users.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
      let profile = await models.Profiles.findOne({ where: { user_id: id } })

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      if (!profile) throw new CustomError('Not found user', 404, 'Not Found')

      let updatedUser = await user.update({
        first_name: obj.first_name,
        last_name: obj.last_name,
        username: obj.username
      }, { transaction })
      let updatedProfile
      if (Object.keys(obj).length == 5) {
        updatedProfile = await profile.update({
          image_url: obj.profile.image_url,
          code_phone: obj.profile.code_phone,
          phone: obj.profile.phone
        }, { transaction })
      }

      await transaction.commit()

      return { updatedUser, updatedProfile }

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async getPublicationsOfUser(id) {
    let profileOfUser = await models.Profiles.findOne({ where: { user_id: id } })
    let publicationsOfProfile = await models.Publications.findAll({ where: { profile_id: profileOfUser.id } })
    return publicationsOfProfile
  }

  async getVotesOfUser(id) {
    let profileOfUser = await models.Profiles.findOne({ where: { user_id: id } })
    let votesOfProfile = await models.Votes.findAll({ where: { profile_id: profileOfUser.id } })
    return votesOfProfile
  }


  async getUserInformation(userId) {
    let user = await models.Users.findOne({ where: { id: userId } })
    let { id, role_id, image_url, code_phone, phone, country_id } = await models.Profiles.findOne({ where: { user_id: userId } })
    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      profile: { id, role_id, image_url, code_phone, phone, country_id }
    }
  }









}

module.exports = UsersService