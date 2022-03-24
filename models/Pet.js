const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config')

class Pet extends Model { } 

Pet.init({
  name: DataTypes.STRING,
  breed: DataTypes.STRING,
  age: DataTypes.INTEGER
}, { sequelize, modelName: 'pet' })

module.exports = Pet
