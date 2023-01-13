
const bcrypt = require('bcrypt')
const saltRounds = 10
const hash = myPlaintextPassword => bcrypt.hashSync(myPlaintextPassword, saltRounds)
const comparePassword = myPlaintextPassword => bcrypt.compareSync(myPlaintextPassword, hash)

module.exports = {
  hash, comparePassword
}