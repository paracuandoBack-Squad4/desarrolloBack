
const bcrypt = require('bcrypt')
const saltRounds = 10
const hash = myPlaintextPassword => bcrypt.hashSync(myPlaintextPassword, saltRounds)
const comparePassword = (myPlaintextPassword, password) => bcrypt.compareSync(myPlaintextPassword, password)

module.exports = {
  hash, comparePassword
}