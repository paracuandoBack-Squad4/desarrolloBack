const UsersService = require('../services/users.services')
const { getPagination, getPagingData } = require('../utils/sequelize-utils')

const usersService = new UsersService()

const getUsers = async (request, response, next) => {
  try {
    let query = request.query
    let { page, size } = query

    const { limit, offset } = getPagination(page, size, '10')
    query.limit = limit
    query.offset = offset

    let users = await usersService.findAndCount(query)
    const results = getPagingData(users, page, limit)
    return response.json({ results: results })

  } catch (error) {
    next(error)
  }
}

const addUser = async (request, response, next) => {
  let { first_name, last_name, email, username, password } = request.body
  if (first_name && last_name && email && username && password) {
    let user = await usersService.createUser({ first_name, last_name, email, username, password })
      .then(data => response.status(200).json(data))
      .catch(err => response.status(400).json({ message: err }))
  }
  else {
    response.status(400).json({ fields: { message: 'string' } })
  }


}

const getUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let users = await usersService.getUserOr404(id)
    return response.json({ results: users })
  } catch (error) {
    next(error)
  }
}

const updateUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let { first_name, last_name, email, username, password } = request.body
    let user = await usersService.updateUser(id, { first_name, last_name, email, username, password })
    return response.json({ results: user })
  } catch (error) {
    next(error)
  }
}

const removeUser = async (request, response, next) => {
  try {
    let { id } = request.params
    let user = await usersService.removeUser(id)
    return response.json({ results: user, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUsers,
  addUser,
  getUser,
  updateUser,
  removeUser
}