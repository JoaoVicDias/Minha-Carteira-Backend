const jwt = require('jsonwebtoken')
require('dotenv/config');

const generateToken = async (email, name) => await jwt.sign({ email, name },process.env.JW__SECRET ,  {expiresIn: 60 * 60 * 0.5})


module.exports = {
    generateToken
};