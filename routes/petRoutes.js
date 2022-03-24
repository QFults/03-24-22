const router = require('express').Router()
const { Pet } = require('../models')

router.post('/pets', async ({ body }, res) => {
  try {
    const pet = await Pet.create(body)
    res.status(200).json(pet)
  } catch (err) {
    res.status(400).json({ message: 'Woops! Something went wrong.' })
  }
})

module.exports = router
