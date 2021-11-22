const express = require('express')
const router = express.Router()
const cardServices = require('../Services/CardServices')
const requiredUser = require('../Middlewares/user')



router.get('/', requiredUser, async (req, res) => {
    const historyCards = await cardServices.getHistoryCardsById(req.user.id)
    res.json(historyCards)
})


module.exports = router