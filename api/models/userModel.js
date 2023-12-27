const mongoose = require('mongoose')
const userShema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }
})
const User = mongoose.model('User', userShema)
module.exports = User