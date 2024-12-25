const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findByPk(req.params.id)
  if (blog) {
    res.json(blog)
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

blogsRouter.delete('/:id', async (req, res) => {
  try {
    const blog = await Blog.findByPk((req.params.id))
    if (blog) {
      await blog.destroy()
    }
    res.sendStatus(204)
  } catch(error) {
    res.status(400).json({ error })
  }
})

module.exports = blogsRouter