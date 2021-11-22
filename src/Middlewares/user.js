const jwtServices = require('../Services/JwtServices')


const ValidationToken =  (req,res,next) => {
    const header = req.headers.authorization
    if(header) {
        const token = req.headers.authorization.split(' ')[1]
        const isValid =  jwtServices.verifyToken(token)
        const userInfo =  jwtServices.decodeToken(token)
        req.user = userInfo

        if(!isValid) {
            res.status(405).send('Sua sessão expirou, faça o login novamente!')
        }
        next()
    } else {
        res.status(405).send('Você precisa estar logado para acessar esta rota!')
    }
}


module.exports = ValidationToken

