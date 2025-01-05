const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const router = require('express').Router()
const { User } = require('../models')

router.post('/', async (req, res) => {
  const username = String(req.body.username)
  const password = String(req.body.password)

  const user = await User.findOne({ where: { username: username } })
  const passwordTrue = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordTrue)) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = { username, id: user.id }
  const token = jwt.sign(userForToken, SECRET)

  res.status(200).json({
    token,
    username,
    name: user.name
  })

})

module.exports = router