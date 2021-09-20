const express = require('express')
const router = express.Router()
const userServices = require('../Services/UserServices')
const bycriptServices = require('../Services/BycriptServices')
const user = require('../Middlewares/user')



router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if(!name) return res.status(400).send('Você precisa escrever um nome!!')
    if(!email) return res.status(400).send('Você precisa escrever um e-mail!!')
    if(!password) return res.status(400).send('Você precisa escrever uma senha!!')

    const existingUser = await userServices.findUserByEmail(email)
    if(existingUser) return res.status(406).send('Esse e-mail já está sendo usado, tente outro!!')

    try{
        const encryptedPassword = await bycriptServices.encrypt(password)

        await UserModel.create({
            name:name,
            email:email,
            password:encryptedPassword
        })
        res.status(200).send("Sua conta foi criada com sucesso!!")
    }catch(e){
        console.log('Alguma coisa deu errado, tente novamente.')
    }
})


module.exports = router