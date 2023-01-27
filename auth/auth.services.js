const jwt = require('jsonwebtoken')
const { createRecoveryToken, verifyUser, changePassword } = require('./auth.controllers')
require('dotenv')
const mailer = require('../utils/mailer')
const config = require('../config')

const postLogin = (request, response) => {

  const { email, password } = request.body
  if (email && password) {
    verifyUser(email, password)
      .then(data => {
        if (data) {
          const token = jwt.sign({
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email
          }, process.env.JWT_SECRET)
          response.status(200).json({ message: 'Correct Credentials', token })
        }
        else {
          response.status(400).json({ message: 'Invalid Credentials' })
        }
      })
      .catch(err => response.status(404).json({ message: err }))
  }
  else {
    response.status(400).json({
      message: 'All parametres are required', fields: {
        email: 'ecample@example.com',
        password: 'string'
      }
    })
  }

}

const postRecoveryToken = (request, response) => {

  const { email } = request.body
  if (email) {
    createRecoveryToken(email)
      .then((data) => {
        if (data) {
          mailer.sendMail({
            from: 'nicolaspantojadi@gmail.com',
            to: email,
            subject: 'Recovery Password',
            html: `<a href='${config.api.host}/api/v1/recovery-password/${data.id}>${config.api.host}/api/v1/recovery-password/${data.id}</a>`
          })
        }
        response.status(200).json({ message: 'Email sended. Check your inbox!' })
      })
      .catch((err) => {
        response.status(400).json({ message: err })
      })
  } else{
    response.status(400).json({message: 'Invalid data', fields: {
      email: 'example@example.com'
    }})
  }
}


const patchPassword = (request, response) => {
  const id = request.params.id
  const { password } = request.body

  changePassword(id, password)
    .then(data => {
      if (data) {
        response.status(200).json({ message: 'Password updated succesfully' })
      } else {
        response.status(400).json({message: 'URL Expired'})
      }
    })
    .catch(err => {
      response.status(400).json({message: err.message})
    } )
}


module.exports = {
  postLogin,
  postRecoveryToken,
  patchPassword
}