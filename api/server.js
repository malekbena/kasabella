const express = require('express')
const app = express()
const db = require('./db/connection')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env.local' })
const cors = require('cors')

db.then(() => {
    app.listen(9000, () => {
        console.log('Connected to MongoDB')
        console.log('Server running on port 9000')
    })
}).catch((error) => {
    console.log(error)
})

const accomodationsRouter = require('./routes/accomodations')
const aboutsRouter = require('./routes/abouts')
const usersRouter = require('./routes/users')

app.use(express.json())
app.use(cors())

app.use('/', accomodationsRouter)

app.use('/', aboutsRouter)

app.use('/auth', usersRouter)

// clés ssh public / privé

// middleware qui verifie le token pour add/update/delete