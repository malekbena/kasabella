const express = require('express')
const app = express()
const db = require('./db/connection')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env.local'})

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

app.use(express.json())

app.use('/', accomodationsRouter)

app.use('/', aboutsRouter)

// const users = [
//     {
//         username: 'admin',
//         password: 'admin'
//     },
//     {
//         username: 'user',
//         password: 'user'
//     }
// ] 

// app.post('/login', (req, res, next) => {
//     const { username, password } = req.body
//     const user = users.find((user) => {
//         return user.username === username && user.password === password
//     })
//     if (user) {
//         const accessToken = jwt.sign({ username: user.username }, process.env.PRIVATE_KEY, { algorithm: 'RS256' })
//         res.status(200).json({ accessToken })
//     } else {
//         res.status(400).json({ message: 'Username or password incorrect' })
//     }
// })

// console.log(decode)

// clés ssh public / privé

// middleware qui verifie le token pour add/update/delete