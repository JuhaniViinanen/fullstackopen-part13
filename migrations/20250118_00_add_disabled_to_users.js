const { DataTypes } = require('sequelize')

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('users', 'disabled', {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
}

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'disabled')
}

module.exports = { up, down }