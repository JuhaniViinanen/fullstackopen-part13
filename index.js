const config = require('./utils/config')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')
const { connectToDatabase } = require('./utils/db')

const express = require('express')
const app = express()

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use(express.json())

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(config.PORT, () => {
    console.log(`server running on port ${config.PORT}`)
  })
}

start()