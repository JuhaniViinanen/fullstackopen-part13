require('dotenv').config()
const { Sequelize, Model, DataTypes } = require('sequelize')
const express = require('express')
const app = express()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    dialect: 'postgres'
  },
});

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    default: 0
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'blog'
})


app.get('/api/blogs', async (_req, res) => {
  const blogs = await Blog.findAll()
  res.json(blogs)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})