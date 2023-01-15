
const bcrypt = require('bcrypt')
const hash = myPlaintextPassword => bcrypt.hashSync(myPlaintextPassword, 10)
const comparePassword = (myPlaintextPassword, password) => bcrypt.compareSync(myPlaintextPassword, password)

module.exports = {
  hash, comparePassword
}