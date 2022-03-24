const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../models')

router.post('/users', async (req, res) => {
  try {
    const data = req.body
    data.password = await bcrypt.hash(req.body.password, 10)
    const user = await User.create(data)
    res.status(200).json(user)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
