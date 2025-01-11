const Blog = require('./blog')
const User = require('./user')
const readingList = require('./readingList')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: readingList })
Blog.belongsToMany(User, { through: readingList })

module.exports = { Blog, User, readingList }