const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: '.env' })

const privateKey = process.env.PRIVATE_KEY


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
            password: hashedPassword,
            isAdmin: body.isAdmin
        })
        delete user.password
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//login
router.post('/login', async (req, res) => {
    const body = req.body
    const user = await User.findOne({ username: body.username }, '+password')
    if (!user) {
        return res.status(400).json({ message: 'Username or password incorrect' })
    }
    const validPassword = await bcrypt.compare(body.password, user.password)
    if (!validPassword) {
        return res.status(400).json({ message: 'Username or password incorrect' })
    }
    delete user.password
    const accessToken = jwt.sign({ user }, privateKey, { algorithm: 'RS256', expiresIn: "30m" })
    const refreshToken = jwt.sign({ user }, privateKey, { algorithm: 'RS256', expiresIn: '7d' })
    res.status(200).json({id: user._id ,username: user.username, token: accessToken, refreshToken, isAdmin: user.isAdmin })
})

//refresh token
router.post('/refresh', async (req, res) => {
    const token = req.body.refreshToken
    jwt.verify(token, privateKey, { algorithms: ['RS256'] }, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Token is not valid' })
        }
        const user = User.findOne({ username: decoded.user.username })
        if (!user) {
            return res.status(400).json({ message: 'User not found' })
        }
        const accessToken = jwt.sign({ user: decoded.user }, privateKey, { algorithm: 'RS256', expiresIn: "30m" })
        const refreshToken = jwt.sign({ user: decoded.user }, privateKey, { algorithm: 'RS256', expiresIn: '7d' })
        res.status(200).json({ accessToken, refreshToken })
    })
})

//delete user
router.delete('/user/:id', async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ message: `Cannot find any user with ID ${id}` })
        }
        res.status(200).json({ user })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router