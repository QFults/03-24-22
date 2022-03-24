const User = require('./User.js')
const Pet = require('./Pet.js')

User.hasMany(Pet, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Pet.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Pet }
