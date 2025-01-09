const router = require('express').Router()
const { Blog } = require('../models')
const { Op } = require('sequelize')
const { sequelize } = require('../utils/db')

router.get('/', async (_req, res) => {

  const blogs = await Blog.findAll({
    attributes: [
      'author',
      [sequelize.fn('count', sequelize.col('title')), 'articles'],
      [sequelize.fn('sum', sequelize.col('likes')), 'likes'],
    ],
    group: sequelize.col('author'),
    order: [['likes', 'DESC']]
  })
  res.json(blogs)
})

module.exports = router