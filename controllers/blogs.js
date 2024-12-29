const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const blogFinder = async (req, _res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

blogsRouter.get('/', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

blogsRouter.get('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog)
  } else {
    res.sendStatus(404)
  }
})

blogsRouter.post('/', async (req, res , next) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', blogFinder, async (req, res) => {
  if (req.blog) {
    try {
      await req.blog.destroy()
    } catch(error) {
      res.status(400).json({ error })
    }
  }
  res.sendStatus(204)
})

blogsRouter.put('/:id', blogFinder, async (req, res, next) => {
  if (req.blog) {
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

module.exports = blogsRouter