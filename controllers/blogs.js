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

blogsRouter.post('/', async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    res.json(blog)
  } catch(error) {
    res.status(400).json({ error })
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

module.exports = blogsRouter