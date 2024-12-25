const config = require('./utils/config')
const express = require('express')
const app = express()

app.use(express.json())

const blogsRouter = require('./controllers/blogs')

app.use('/api/blogs', blogsRouter)

app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT}`)
})