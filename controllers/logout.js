const router = require('express').Router()
const { User, activeSession } = require('../models')

const { tokenExtractor } = require('../utils/middleware')

router.post('/', tokenExtractor, async (req, res) => {
  // Get sessionId from the decoded authorization token
  const { sessionId } = req.decodedToken

  // Find active session
  const session = await activeSession.findByPk(sessionId)

  // Delete active session if it exists
  if (session) {
    await session.destroy()
  }

  res.sendStatus(200)
})

module.exports = router