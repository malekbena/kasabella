require('dotenv').config({ path: '.env.local' })
const mongoose = require('mongoose')

const dbConnect = mongoose.connect(process.env.DATABASE_URL)

module.exports = dbConnect