const router = require('express').Router()
const { readingList, User } = require('../models')

const { tokenExtractor } = require('../utils/middleware')

router.get('/', async (_req, res) => {
  const result = await readingList.findAll()
  res.json(result)
})

router.post('/', async (req, res, next) => {
  try {
    const result = await readingList.create(req.body)
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const reading = await readingList.findByPk(req.params.id)
    if (!reading) {
      return res.sendStatus(404)
    }

    const user = await User.findByPk(req.decodedToken.id)
    if (!user) {
      return res.status(400).json({ error: 'user not found' })
    }
    if (reading.userId !== user.id) {
      return res.sendStatus(403)
    }

    reading.read = req.body.read
    await reading.save()
    res.status(200).json({ read: reading.read })
  } catch (error) {
    next(error)
  }  
})

module.exports = router