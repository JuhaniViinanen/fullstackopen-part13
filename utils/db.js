const { Sequelize } = require('sequelize')
const config = require('./config')

const sequelize = new Sequelize(config.DATABASE_URL)

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch(error) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }
  return null
}

module.exports = { connectToDatabase, sequelize }