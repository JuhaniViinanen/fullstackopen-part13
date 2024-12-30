const bcrypt = require('bcrypt')
const router = require('express').Router()
const { User } = require('../models')

router.get('/', async (_req, res) => {
  const blogs = await User.findAll({
    attributes: { exclude: ['id', 'passwordHash'] }
  })
  res.json(blogs)
})

router.post('/', async (req, res) => {
  try {
    const { name, username, password } = req.body
    const saltRounds = 13
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = await User.create({ name, username, passwordHash })
    res.status(201).json(user)
  } catch(error) {
    res.status(400).json({ error })
  }
})

router.put('/:username', async (req, res) => {
  try {
    const username = req.params.username
    const newUsername = req.body.username

    const user = await User.findOne({ where: { username: username } })
    if (!user) {
      return res.sendStatus(404)
    }

    user.username = newUsername
    await user.save()
    res.json({ username: newUsername })
  } catch(error) {
    res.status(400).json({ error })
  }
})

module.exports = router