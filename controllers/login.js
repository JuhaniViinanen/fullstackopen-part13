const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

const router = require('express').Router()
const { User, activeSession } = require('../models')

router.post('/', async (req, res) => {
  const username = String(req.body.username)
  const password = String(req.body.password)

  // Authenticate user & password
  const user = await User.findOne({ where: { username: username } })
  const passwordTrue = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordTrue)) {
    return res.status(401).json({ error: 'invalid username or password' })
  }

  // Create active session for user
  const session = await activeSession.create({ userId: user.id })
  
  // Create a token for user
  const payload = {
    username,
    id: user.id,
    sessionId: session.id,
  }
  const token = jwt.sign(payload, SECRET)

  res.status(200).json({
    token,
    username,
    name: user.name
  })

})

module.exports = router