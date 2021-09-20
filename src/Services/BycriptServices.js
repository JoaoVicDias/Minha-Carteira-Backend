const bycript = require('bcrypt')


const encrypt = async data => await bycript.hash(data,7)

const comparePassword = async (password,encryptedPassword) => await bycript.compare(password,encryptedPassword)


module.exports = {
    encrypt,
    comparePassword
};