const router = require('express').Router()
const { Blog, User } = require('../models')
const { Op } = require('sequelize')

const { tokenExtractor } = require('../utils/middleware')

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get('/', async (req, res) => {
  let where = {}

  if (req.query.search) {
    where = {
      [Op.or]: [{
        title: {
          [Op.iLike]: `%${req.query.search}%`
        }
      },{
        author: {
          [Op.iLike]: `%${req.query.search}%`
        }
      }]
    }
  }

  const blogs = await Blog.findAll({
    attributes: {
      exclude: ['userId']
    },
    include: {
      model: User,
      attributes: ['name']
    },
    where,
    order: [
      ['likes', 'DESC']
    ]
  })
  res.json(blogs)
})

router.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.sendStatus(404)
  }
})

router.post('/', tokenExtractor, async (req, res , next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id})
    res.json(blog)
  } catch(error) {
    next(error)
  }
})

router.delete('/:id', tokenExtractor, blogFinder, async (req, res) => {
  if (req.blog) {
    if (req.blog.userId !== req.decodedToken.id) {
      return res.sendStatus(401)
    }

    try {
      await req.blog.destroy()
    } catch(error) {
      res.status(400).json({ error })
    }
  }
  res.sendStatus(204)
})

router.put('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
    if (!req.body.likes) {
      return res.status(400).json({ error: 'likes must be a number value' })
    }
    try {
      req.blog.likes = req.body.likes
      await req.blog.save()
      res.json({ likes: req.blog.likes })
    } catch(error) {
      error.message = 'likes must be a number value'
      next(error)
    }    
  } else {
    res.sendStatus(404)
  }
})

module.exports = router