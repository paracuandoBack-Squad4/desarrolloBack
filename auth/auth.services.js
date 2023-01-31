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
            from: 'eduardohelfer@gmail.com',
            to: email,
            subject: 'Recovery Password',
            html: `Through this link you'll be able to receover the access by updating your password: <a href='${config.api.host}/api/v1/recovery-password/${data.dataValues.id}'>${config.api.host}/api/v1/recovery-password/${data.dataValues.id}</a>`,
            text: `Password recovery URL: ${config.api.host}/api/v1/recovery-password/${data.dataValues.id}`
          })
          response.status(200).json({ message: 'Email sended. Check your inbox!' })
        } else {
          response.status(400).json({ message: 'Error, token not created' })
        }
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