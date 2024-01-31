const mongoose = require('mongoose')
const userShema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required: true,
        select : false
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
})
const User = mongoose.model('User', userShema)
module.exports = User