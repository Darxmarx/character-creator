const sequalize = require('../config/connection');
const {ABilities, Character, User} = require('../models');

const userData = require('./userData.json');
const characterData = require('./characterData.json');
const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({force: true});
    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const character of characterData) {
        await Character.create({
            ...character,
            user_id: users[Math.floor(Math.random() * users.length)].id, // associates the characters with a random user id
        });
    }

    process.exit(0);
}

seedDatabase();