const jwt = require('jsonwebtoken')

const generateToken = async (email, name) => await jwt.sign({ email, name }, {expiresIn: 60 * 60 * 0.5})


module.exports = {
    generateToken
};