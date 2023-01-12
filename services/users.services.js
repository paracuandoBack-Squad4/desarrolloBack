const uuid4 = require('uuid')
const Users = require('../database/models/users')
const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

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

    const users = await Users().findAndCountAll(options)
    return users
  }

  async createUser(obj) {
    const transaction = await Users().sequelize.transaction()
    try {
      let newUser = await Users().create({
        //id: uuid4() --> aquí se debe usar el uuid maker si es que se usa
        id: uuid4(),
        first_name: obj.first_name,
        last_name: obj.last_name,
        email: obj.email,
        username: obj.username,
        password: obj.password,
        email_verified: obj.email_verified,
        token: obj.token
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
    let user = await Users().findByPk(id)

    if (!user) throw new CustomError('Not found User', 404, 'Not Found')

    return user
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getUser(id) {
    let user = await Users().findByPk(id, { raw: true })
    return user
  }

  async updateUser(id, obj) {
    const transaction = await Users().sequelize.transaction()
    try {
      let user = await Users().findByPk(id)

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')

      let updatedUser = await user.update({
        first_name: obj.first_name,
        last_name: obj.last_name,
        email: obj.email,
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

  async removeUser(id) {
    const transaction = await Users().sequelize.transaction()
    try {
      let user = await Users().findByPk(id)

      if (!user) throw new CustomError('Not found user', 404, 'Not Found')

      await user.destroy({ transaction })

      await transaction.commit()

      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

}

module.exports = UsersService