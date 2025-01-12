const router = require('express').Router()
const { readingList } = require('../models')

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

module.exports = router