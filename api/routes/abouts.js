const express = require('express')
const router = express.Router()
const About = require('../models/aboutModel')
const checkToken = require('../middlewares/index')

//get
router.get('/abouts', async (req, res) => {
    try {
        const abouts = await About.find({})
        res.status(200).json({ abouts })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/about/:id', async (req, res) => {
    try {
        const { id } = req.params
        const about = await About.findById(id)
        res.status(200).json({ about })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//add
router.post('/about',
    checkToken,
    async (req, res) => {
        try {
            const about = await About.create(req.body)
            res.status(200).json({ about })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }
    })

//update
router.patch('/about/:id',
    checkToken,
    async (req, res) => {
        try {
            const { id } = req.params
            const about = await About.findByIdAndUpdate(id, req.body)
            if (!about) {
                return res.status(404).json({ message: `Cannot find any result with ID ${id}` })
            }
            const updatedAbout = await About.findById(id)
            res.status(200).json({ updatedAbout })
        } catch (error) {
            res.status(500).json({ message: error.message })

        }
    })

//delete
router.delete('/about/:id',
    checkToken,
    async (req, res) => {
        try {
            const { id } = req.params
            const about = await About.findByIdAndDelete(id)
            if (!about) {
                return res.status(404).json({ message: `Cannot find any result with ID ${id}` })
            }
            res.status(200).json({ about })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })

module.exports = router