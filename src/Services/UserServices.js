const UserModel = require('../Models/User')



const findUserByEmail = async email => await UserModel.findOne({where:{email:email}})




module.exports = {
    findUserByEmail
};