const express = require('express')
const router = express.Router()
const requiredUser = require('../Middlewares/user')
const CardServices = require('../Services/CardServices')


router.get('/:type', requiredUser, async (req, res) => {
    const { type } = req.params;

    const cards = await CardServices.getCardsByType(type, req.user.id);

    res.json(cards)
})

router.post('/create-card', requiredUser, async (req, res) => {
    const { title, amount, type, frequency, dateInit, dateEnd } = req.body;

    if (!title || !amount || !type || !frequency || !dateInit) res.status(406).send("Faltam argumentos para essa requisição!")

    try {
        const createdCard = await CardServices.createCard({
            user_id: req.user.id,
            title,
            amount,
            type,
            frequency,
            dateInit,
            dateEnd

        })

        await CardServices.createCardInHistory(createdCard.dataValues)

        res.json({ createdCard })

    } catch (e) {
        throw new Error(e)
    }
})

router.patch('/edit-card', requiredUser, async (req, res) => {
    const { id, title, amount, type, frequency, dateInit, dateEnd } = req.body;

    if (!title || !id || !amount || !type || !frequency || !dateInit) res.status(406).send("Faltam argumentos para essa requisição!")

    const editedCard = await CardServices.editCard({
        id,
        title,
        amount,
        type,
        frequency,
        dateInit,
        dateEnd
    })

    res.json({ ...editedCard })

})

router.delete('/delete/:cardId', requiredUser, async (req, res) => {
    const { cardId } = req.params;

    const deletedCard = await CardServices.deleteCardByid(cardId)

    res.json(deletedCard)
})


module.exports = router