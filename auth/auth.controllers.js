const UsersService = require('../services/users.services')
const { comparePassword } = require('../utils/Crypto')
const UsersServices = new UsersService()
const RecoveryPassword = require('../database/models/recovery_password')
const uuid = require('uuid')
const { updateUser } = require('../controllers/users.controllers')
const { hash } = require('../utils/Crypto')

const verifyUser = async (email, password) => {
  try {
    const user = await UsersServices.getUserByEmail(email)
    const compare = comparePassword(password, user.password)
    if (compare) {
      return user
    }
    else {
      return null
    }
  } catch (error) {
    return null
  }
}

const createRecoveryToken = async (email) => {
  try {
    const user = await UsersServices.getUserByEmail(email)
    const data = await RecoveryPassword.create({
      id: uuid.v4(),
      user_id: user.id
    })
    return data
  } catch (error) {
    return null
  }
}

const changePassword = async (tokenId, newPassword) => {
  const changeData = await RecoveryPassword.findOne({
    where: {
      id: tokenId,
      used: false
    }
  })
  if(changeData) {
    await RecoveryPassword.update({used: true}, {
      where: {
        id: tokenId
      }
    })
    const data = await updateUser(changeData.user_id, {
      password: hash(newPassword)
    })
    return data
  } else {
    return false
  }
}


module.exports = {
  verifyUser,
  createRecoveryToken,
  changePassword
}


