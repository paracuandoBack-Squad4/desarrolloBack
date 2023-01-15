const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const { hash } = require('../utils/Crypto')
const models = require('../database/models/index')


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
      let newUser = await models.Users.create({
        id: obj.id,
        first_name: obj.first_name,
        last_name: obj.last_name,
        email: obj.email,
        username: obj.username,
        password: hash(obj.password),
      }, { transaction })
      await transaction.commit()
      return newUser
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

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')

      let updatedUser = await user.update({
        first_name: obj.first_name,
        last_name: obj.last_name,
        username: obj.username,
        password: obj.password
      }, { transaction })

      await transaction.commit()

      return updatedUser

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









}

module.exports = UsersService