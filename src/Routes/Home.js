const express = require('express')
const router = express.Router()
const requiredUser = require('../Middlewares/user')



router.get('/', requiredUser,  async (req, res) => {
    res.json({message:'aqui'})
})



module.exports = router