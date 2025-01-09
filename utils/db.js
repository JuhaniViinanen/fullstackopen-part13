const { Sequelize } = require('sequelize')
const config = require('./config')
const {Umzug, SequelizeStorage} = require('umzug')

const sequelize = new Sequelize(config.DATABASE_URL)

const runMigrations = async () => {

  // The glob package has some probles with windows paths
  // this makes it work
  const pattern = `${process.cwd().replaceAll(/\\/g,'/')}/migrations/*.js`

  const umzug = new Umzug({
    migrations: {glob: pattern},
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({sequelize, tableName: 'migrations'}),
    logger: console,
  })

  const migrations = await umzug.up()
  console.log('Migrations up to date', {
    files: migrations.map(mig => mig.name)
  })
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('connected to the database')
  } catch(error) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }
  return null
}

module.exports = { connectToDatabase, sequelize }