const config = require('./utils/config')
const { connectToDatabase } = require('./utils/db')

const express = require('express')
const app = express()

const blogsRouter = require('./controllers/blogs')

app.use(express.json())

app.use('/api/blogs', blogsRouter)

const start = async () => {
  await connectToDatabase()
  app.listen(config.PORT, () => {
    console.log(`server running on port ${config.PORT}`)
  })
}

start()