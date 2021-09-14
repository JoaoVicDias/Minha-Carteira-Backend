const { DataTypes } = require('sequelize')
const sequelize = require('./DataBase')


const User = sequelize.define('User',{
    id:{
        primaryKey:true,
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV1,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports =  User