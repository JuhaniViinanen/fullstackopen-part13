const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class activeSession extends Model {}

activeSession.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' }
  },
}, {
  sequelize,
  underscored: true,
  modelName: 'activeSession',
})

module.exports = activeSession