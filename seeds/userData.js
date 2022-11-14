const {User} = require('../models');
const userData =

[
    {
      "name": "peter",
      "email": "peter@hotmail.com",
      "password": "password"
    }
  ]
  
    
const seedUser = () => User.bulkCreate(userData, {
  individualHooks: true,
  returning: true,
});

module.exports = seedUser;