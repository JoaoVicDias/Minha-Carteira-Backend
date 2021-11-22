const { DataTypes } = require('sequelize')
const sequelize = require('./DataBase')
const User = require('./User')

const Card = sequelize.define('Card', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    frequency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateInit: {
        type: DataTypes.DATE,
        allowNull: false
    },
    dateEnd:{
        type: DataTypes.DATE,
        allowNull: true
    },
})

Card.belongsTo(User,{
    foreignKey:"user_id"
})


module.exports = Card