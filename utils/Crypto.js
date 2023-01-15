
const bcrypt = require('bcrypt')
const hash = myPlaintextPassword => bcrypt.hashSync(myPlaintextPassword, 20)
const comparePassword = (myPlaintextPassword, password) => bcrypt.compareSync(myPlaintextPassword, password)

module.exports = {
  hash, comparePassword
}