const {User} = require('../models');
const userData =

[
    {
      "name": "peter",
      "email": "peter@hotmail.com",
      "password": "password12345"
    }
  ]
  
    
const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;