const User = require('./User');
const Character = require('./Character');
// const Abilities = require('./Abilities');

User.hasMany(Character, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Character.belongsTo(User, {
    foreignKey: 'user_id'
});


module.exports = { User, Character };