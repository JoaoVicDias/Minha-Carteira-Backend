const express = require('express')
const router = express.Router()
const user = require('../Middlewares/user')
const UserModel = require('../Models/User')
const bycript = require('bcrypt')



router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if(!name) return res.json({message:'Você precisa escrever um nome!!'})
    if(!email) return res.json({message:'Você precisa escrever um e-mail!!'})
    if(!password) return res.json({message:'Você precisa escrever uma senha!!'})

    const existingUser = await UserModel.findOne({where:{email:email}})
    if(existingUser) return res.json({message:'Esse e-mail já está sendo usado, tente outro!!'})

    try{
        const encryptedPassword = await bycript.hash(password,7)

        await UserModel.create({
            name:name,
            email:email,
            password:encryptedPassword
        })
        res.json({message:"Sua conta foi criada com sucesso!!"})
    }catch(e){
        res.json({message:"Alguma coisa aconteceu, tente novamente!!",error:e})
    }
})


module.exports = router