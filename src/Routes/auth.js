const express = require('express')
const router = express.Router()
const userServices = require('../Services/UserServices')
const bycriptServices = require('../Services/BycriptServices')
const jwtServices = require('../Services/JwtServices')
const user = require('../Middlewares/user')



router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name) return res.status(400).send('Você precisa escrever um nome!!')
    if (!email) return res.status(400).send('Você precisa escrever um e-mail!!')
    if (!password) return res.status(400).send('Você precisa escrever uma senha!!')

    const existingUser = await userServices.findUserByEmail(email)
    if (existingUser) return res.status(406).send('Esse e-mail já está sendo usado, tente outro!!')

    try {
        const encryptedPassword = await bycriptServices.encrypt(password)

        await userServices.createUser({name, email, password:encryptedPassword})

        res.status(200).send("Sua conta foi criada com sucesso!!")
    } catch (e) {
        console.log('Alguma coisa deu errado, tente novamente.')
        res.status(404).send("Alguma coisa deu errado, tente novamente.")
        console.log(e)
    }
})


router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await userServices.findUserByEmail(email)
    if (!existingUser) return res.status(406).send('Seu e-mail está incorreto, tente novamente')

    const userEmail = existingUser.dataValues.email;
    const userName = existingUser.dataValues.name

    const matchPassword = await bycriptServices.comparePassword(password,existingUser.dataValues.password)
    if (!matchPassword) return res.status(406).send('Sua senha está incorreta, tente novamente')
    
    try {
        const token = await jwtServices.generateToken(userEmail,userName)
        res.json({token})
    } catch(e){
        res.status(404).send("Alguma coisa deu errado, tente novamente.")
        console.log(e)
    }
})

module.exports = router