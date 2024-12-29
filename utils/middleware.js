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

module.exports = {
  unknownEndpoint,
  errorHandler
}
