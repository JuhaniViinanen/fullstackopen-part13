const bcrypt = require('bcrypt')
const router = require('express').Router()
const { User, Blog } = require('../models')

router.get('/', async (_req, res) => {
  const blogs = await User.findAll({
    attributes: {
      exclude: [
        'id',
        'passwordHash',
        'disabled',
      ]
    },
    include: {
      model: Blog,
      attributes: {
        exclude: ['userId']
      }
    }
  })
  res.json(blogs)
})

router.get('/:id', async (req, res) => {

  let where = {}
  const { read } = req.query
  if (read) {
    if (!['true', 'false'].includes(read)) {
      return res.status(400).json({ error: `query parameter read invalid value: ${read}` })
    }
    where = {
      read: 'true' === read
    }
  }
  
  const user = await User.findByPk(req.params.id, {
    attributes: {
      exclude: [
        'id',
        'passwordHash',
        'disabled',
      ]
    },
    include: [
      {
        model: Blog,
        attributes: { exclude: ['userId'] }
      },
      {
        model: Blog,
        as: 'readings',
        attributes: {
          exclude: ['userId', 'createdAt', 'updatedAt']
        },
        through: {
          attributes: ['id', 'read'],
          where
        }
      }
    ]
  })

  if (user) {
    res.json(user)
  } else {
    res.sendStatus(404)
  }
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