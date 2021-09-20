const UserModel = require('../Models/User')



const findUserByEmail = async email => await UserModel.findOne({ where: { email: email } })

const createUser = async ( userInfo ) => await UserModel.create({...userInfo})



module.exports = {
    findUserByEmail,
    createUser
};