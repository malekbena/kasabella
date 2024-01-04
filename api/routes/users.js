const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs')

const privateKey = fs.readFileSync('./keys/jwtRS256.key', 'utf8')

//singup
router.post('/signup', async (req, res) => {
    const body = req.body
    if (!body.username || !body.password) {
        return res.status(400).json({ message: 'Data not formated properly' })
    }
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(body.password, salt)
        const user = await User.create({
            username: body.username,
            password: hashedPassword
        })
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//login
router.post('/login', async (req, res) => {
    const body = req.body
    const expiresIn = '30m'
    const user = await User.findOne({ username: body.username })
    if (!user) {
        return res.status(400).json({ message: 'Username or password incorrect' })
    }
    const validPassword = await bcrypt.compare(body.password, user.password)
    if (!validPassword) {
        return res.status(400).json({ message: 'Username or password incorrect' })
    }
    jwt.sign({ user }, privateKey, { algorithm: 'RS256', expiresIn: expiresIn }, (err, token) => {
        if (err) {
            return res.status(500).json({ message: err.message })
        }
        res.status(200).json({ id: user._id, username: user.username, token: token })
    })
})

module.exports = router