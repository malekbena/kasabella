const mongoose = require('mongoose')
const accomodationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cover: {
        type: String,
        required: true
    },
    pictures: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    host: {
        'name': String,
        'picture': String,
    },
    rating: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    equipments: {
        type: Array,
        required: true
    },
    tags: {
        type: Array,
        required: true
    }
},
    {
        timestamps: true
    }
)

const Accomodation = mongoose.model('Accomodation', accomodationSchema)
module.exports = Accomodation