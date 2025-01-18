const config = require('./utils/config')
const { unknownEndpoint, errorHandler } = require('./utils/middleware')
const { connectToDatabase } = require('./utils/db')

const express = require('express')
const app = express()

const authorsRouter = require('./controllers/authors')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const readinglistsRouter = require('./controllers/readinglists')
const usersRouter = require('./controllers/users')

app.use(express.json())

app.use('/api/authors', authorsRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/readinglists', readinglistsRouter)
app.use('/api/users', usersRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(config.PORT, () => {
    console.log(`server running on port ${config.PORT}`)
  })
}

start()