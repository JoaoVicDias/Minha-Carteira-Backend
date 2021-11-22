const { DataTypes } = require('sequelize')
const sequelize = require('./DataBase')
const Card = require('./Card')
const User = require('./User')

const HistoryCard = sequelize.define('HistoryCard', {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV1,
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
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
   
})


HistoryCard.belongsTo(User,{
    foreignKey:"user_id"
})


HistoryCard.belongsTo(Card,{
    foreignKey:"card_id"
})

module.exports = HistoryCard