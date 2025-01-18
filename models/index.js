const Blog = require('./blog')
const User = require('./user')
const readingList = require('./readingList')
const activeSession = require('./activeSession')

User.hasOne(activeSession)
activeSession.belongsTo(User)

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: readingList, as: 'readings' })
Blog.belongsToMany(User, { through: readingList, as: 'readers' })

module.exports = { Blog, User, readingList, activeSession }