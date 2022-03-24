const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config')

class User extends Model { }

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8]
    }
  }
}, { 
  hooks: {
    beforeCreate: async (user) => {
      user.email = await user.email.toLowerCase()
      return user
    },
    beforeUpdate: async (user) => {
      user.email = await user.email.toLowerCase()
      return user
    }
  },
  sequelize, 
  modelName: 'user'
 })

module.exports = User
