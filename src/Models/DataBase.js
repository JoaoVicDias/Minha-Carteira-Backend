const { Sequelize } = require('sequelize')
require('dotenv/config')

const sequelize = new Sequelize(process.env.DB__NAME, process.env.DB__USERNAME, process.env.DB__PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB__HOST
})

module.exports = sequelize