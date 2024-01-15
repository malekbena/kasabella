const express = require('express')
const app = express()
const db = require('./db/connection')
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
app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}))


app.use('/', accomodationsRouter)

app.use('/', aboutsRouter)

app.use('/auth', usersRouter)
