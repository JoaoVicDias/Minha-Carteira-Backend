const Card = require('../Models/Card')
const HistoryCard = require('../Models/HistoryCard')

const getAllCards = () => (
    Card.findAll()
);

const getCardsByType = (type, userId) => {
    return Card.findAll({
        where: {
            user_id: userId,
            type,
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
}

const createCard = ({
    user_id,
    title,
    amount,
    type,
    frequency,
    dateInit,
    dateEnd
}) => {
    return Card.create({
        user_id,
        title,
        amount,
        type,
        frequency,
        dateInit,
        dateEnd

    })
}

const createCardInHistory = ({
    id,
    user_id,
    title,
    amount,
    type,
    frequency,
    dateInit
}) => {
    return HistoryCard.create({
        card_id: id,
        user_id,
        title,
        amount,
        type,
        frequency,
        date: dateInit
    })
}

const editCard = ({ id,
    title,
    amount,
    type,
    frequency,
    dateInit,
    dateEnd }) => {
    return Card.update({
        title,
        amount,
        type,
        frequency,
        dateInit,
        dateEnd
    },
        {
            where: {
                id
            }
        })
}

const deleteCardByid = (cardId) => {
    return Card.destroy({
        where: {
            id: cardId
        }
    })
}

const getHistoryCardsById = (userId) => (
    HistoryCard.findAll({
        where:{
            user_id: userId
        }
    })
)

const getAllHistoryCards = () => (
    HistoryCard.findAll()
)

const deleteHistoryCardById = cardId => (
    HistoryCard.destroy({
        where: {
            card_id: cardId 
        }
    })
)

module.exports = {
    getCardsByType,
    getHistoryCardsById,
    getAllHistoryCards,
    deleteHistoryCardById,
    createCard,
    createCardInHistory,
    deleteCardByid,
    editCard,
    getAllCards
    
};