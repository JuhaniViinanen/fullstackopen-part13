const { DataTypes } = require('sequelize')

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('blogs', {
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
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      isDate: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      isDate: true
    }
  })
  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    username: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: { isEmail: true }
    },
    password_hash: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      isDate: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      isDate: true
    }
  })
  await queryInterface.addColumn('blogs', 'user_id', {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
  })
}

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('blogs')
  await queryInterface.dropTable('users')
}

module.exports = { up, down }