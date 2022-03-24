const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Pet } = require('../models')

router.post('/users/login', async ({ body: { email, password } }, res) => {
  try {
    const user = await User.findOne({ where: { email }, include: [Pet] })

    if (!user) {
      res.status(404).json({ message: 'Invalid Email or Password.'})
      return
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      res.status(400).json({ message: 'Invalid Email or Password.'})
      return
    }

    res.status(200).json({ 
      id: user.id,
      username: user.username,
      email: user.email,
      pets: user.pets
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

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

router.put('/users/:id', async ({ body, params: { id } }, res) => {
  try {
    const user = await User.update(body, { where: { id } , individualHooks: true })

    if (!user[0]) {
      res.status(404).json({ message: 'No user with this id.' })
      return
    }

    res.status(200).json(user)

  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
