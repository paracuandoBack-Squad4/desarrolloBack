const UsersService = require('../services/users.services')

const userService = new UsersService()

const isAdmin = async (request, response, next) => {
  const id = request.user.id
  userService.getUserInformation(id)
    .then(data => {
      if (data.profile.role_id == 2) {
        next()
      }
      else {
        response.status(400).json({ message: 'Only admins have access' })
      }
    })
    .catch(err => response.status(400).json({ message: err.message })
    )
}
module.exports = isAdmin