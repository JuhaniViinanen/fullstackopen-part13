const bcrypt = require('bcrypt')
const router = require('express').Router()
const { User, Blog } = require('../models')

router.get('/', async (_req, res) => {
  const blogs = await User.findAll({
    attributes: {
      exclude: ['id', 'passwordHash']
    },
    include: {
      model: Blog
    }
  })
  res.json(blogs)
})

router.post('/', async (req, res, next) => {
  try {
    const { name, username, password } = req.body
    const saltRounds = 13
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = await User.create({ name, username, passwordHash })
    res.status(201).json({
      name: user.name,
      username: user.username
    })
  } catch(error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
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
    next(error)
  }
})

module.exports = router