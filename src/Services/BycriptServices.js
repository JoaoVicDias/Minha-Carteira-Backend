const bycript = require('bcrypt')


const encrypt = async data => await bycript.hash(data,7)




module.exports = {
    encrypt
};