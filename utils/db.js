const { Sequelize } = require('sequelize')
const config = require('./config')
const {Umzug, SequelizeStorage} = require('umzug')

const sequelize = new Sequelize(config.DATABASE_URL)


// The glob package has some probles with windows paths, this should work
const migrationConf = {
  migrations: {glob: `${process.cwd().replaceAll(/\\/g,'/')}/migrations/*.js`},
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({sequelize, tableName: 'migrations'}),
  logger: console,
}

const runMigrations = async () => {
  const umzug = new Umzug(migrationConf)
  const migrations = await umzug.up()
  console.log('Migrations up to date', {
    files: migrations.map(mig => mig.name)
  })
}

const rollbackMigrations = async () => {
  await sequelize.authenticate()
  const umzug = new Umzug(migrationConf)
  await umzug.down()
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

module.exports = { connectToDatabase, sequelize, rollbackMigrations }