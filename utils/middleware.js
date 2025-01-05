const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')

const unknownEndpoint = (_req, res) => {
  res.sendStatus(404)
}

const errorHandler = (error, _req, res, next) => {
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({ errors: error.errors.map(e => e.message) })
  } else if (error.name === "SequelizeDatabaseError") {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
    } catch(error) {
      return res.status(401).json({ error: 'invalid token' })
    }
  } else {
    return res.status(401).json({ error: 'missing authorization token' })
  }

  next()
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor
}
