const mongoose = require('mongoose')
const aboutSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
})

const About = mongoose.model('About', aboutSchema)
module.exports = About