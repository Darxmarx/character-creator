const sequalize = require('../config/connection');
const { Character, User} = require('../models');


const seedUser = require('./userData');
const seedCharacter = require('./characterData');
// const seedAbilities = require('./abilitiesData');
const sequelize = require('../config/connection');

const seedDatabase = async () => {
    await sequelize.sync({force: true});
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });
    

    for (const character of characterData) {
        await Character.create({
            ...character,
            user_id: users[Math.floor(Math.random() * users.length)].id, // associates the characters with a random user id
        });
        
    }

    // for (const abilities of abilitiesData) {
    //     await Abilities.create({
    //         ...abilities,
    //         user_id: ch[Math.floor(Math.random() * users.length)].id, // associates the characters with a random user id
    //     });
    // }

 

    process.exit(0);
}

const seedAll = async () => {
    await sequalize.sync({force: true});
    await seedUser();
    await seedCharacter();
    // await seedAbilities();

    process.exit(0)
}

seedAll();

