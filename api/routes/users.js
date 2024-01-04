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
    const user = await User.findOne({ username: body.username })
    if (!user) {
        return res.status(400).json({ message: 'Username or password incorrect' })
    }
    const validPassword = await bcrypt.compare(body.password, user.password)
    if (!validPassword) {
        return res.status(400).json({ message: 'Username or password incorrect' })
    }
    const accessToken = jwt.sign({ user }, privateKey, { algorithm: 'RS256', expiresIn: "30m" })
    const refreshToken = jwt.sign({ user }, privateKey, { algorithm: 'RS256', expiresIn: '1h' })
    res.status(200).json({id: user._id ,username: user.username, accessToken, refreshToken })
})

router.post('/refresh', async (req, res) => {
    const authHeader = req.headers.authorization
    const token = authHeader.split(' ')[1]
    jwt.verify(token, privateKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Token is not valid' })
            }
        const accessToken = jwt.sign({ user: decoded.user }, privateKey, { algorithm: 'RS256', expiresIn: "30m" })
        const refreshToken = jwt.sign({ user: decoded.user }, privateKey, { algorithm: 'RS256', expiresIn: '1h' })
        res.status(200).json({ accessToken, refreshToken })
    })
})

module.exports = router