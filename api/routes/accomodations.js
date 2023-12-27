const express = require('express')
const router = express.Router()
const Accomodation = require('../models/accomodationModel')
const checkToken = require('../middlewares/index')

//get
router.get('/accomodations', async (req, res) => {
    try {
        const accomodations = await Accomodation.find({})
        res.status(200).json({ accomodations })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/accomodation/:id', async (req, res) => {
    try {
        const { id } = req.params
        const accomodation = await Accomodation.findById(id)
        res.status(200).json({ accomodation })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//add
router.post('/accomodation',
    checkToken,
    async (req, res) => {
        try {
            const accomodation = await Accomodation.create(req.body)
            res.status(200).json({ accomodation })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.message })
        }
    })

//update
router.patch('/accomodation/:id',
    checkToken,
    async (req, res) => {
        try {
            const { id } = req.params
            const accomodation = await Accomodation.findByIdAndUpdate(id, req.body)
            if (!accomodation) {
                return res.status(404).json({ message: `Cannot find any accomodation with ID ${id}` })
            }
            const updatedAccomodation = await Accomodation.findById(id)
            res.status(200).json({ updatedAccomodation })
        } catch (error) {
            res.status(500).json({ message: error.message })

        }
    })
//delete
router.delete('/accomodation/:id',
    checkToken,
    async (req, res) => {
        try {
            const { id } = req.params
            const accomodation = await Accomodation.findByIdAndDelete(id)
            if (!accomodation) {
                return res.status(404).json({ message: `Cannot find any accomodation with ID ${id}` })
            }
            res.status(200).json({ accomodation })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })

module.exports = router