const jwt = require('jsonwebtoken')
require('dotenv/config');

const generateToken = ({id, email, name}) => jwt.sign({ email, name, id },process.env.JW__SECRET ,  { expiresIn: '1h', algorithm: 'HS512' })

const verifyToken = (token) => jwt.verify(token,process.env.JW__SECRET, (err,isValid)=> err ? false : true)

const decodeToken = (token) => jwt.decode(token);
module.exports = {
    generateToken,
    verifyToken,
    decodeToken
};