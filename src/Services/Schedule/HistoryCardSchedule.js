const cardService = require('../CardServices')


const HistoryCardSchedule = async () => {
    const currentMonth = new Date().getMonth() + 1
    const allCards = await cardService.getAllCards()
    const allHistoryCards = await cardService.getAllHistoryCards()

    if (allCards.length === 0) return

    for (let i = 0; i < allCards.length; i++) {
        const item = allCards[i]
        const dateInitItem = new Date(item.dateInit)
        const dateEndItem = new Date(item.dateEnd)
        const repeatedCard = allHistoryCards.find(historyCard => historyCard.dataValues.card_id === item.dataValues.id && new Date(historyCard.dataValues.date).getMonth() + 1 === currentMonth)

        if (repeatedCard || new Date() < dateInitItem || new Date() > dateEndItem ) return

        await cardService.createCardInHistory({
            ...item.dataValues,
            title: item.dataValues.title,
            amount: item.dataValues.amount,
            frequency: item.dataValues.frequency,
            type: item.dataValues.type,
            user_id: item.dataValues.user_id,
            dateInit: new Date()
        })
    }
}

const deleteExpiredCard = async () => {
    const allCards = await cardService.getAllCards();

    for (let i = 0; i < allCards.length; i++) {
        const item = allCards[i]
        if(item.dataValues.frequency === 'eventual' && item.dataValues.dateEnd < new Date()){
            await cardService.deleteCardByid(item.dataValues.id)
        }
    }
}


module.exports = {
    HistoryCardSchedule,
    deleteExpiredCard
}