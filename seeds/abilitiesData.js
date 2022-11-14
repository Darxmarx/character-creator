const {Abilities} = require('../models');
const abilitiesData =
[
    {
        "name": "spider sense",
        "ability_desc": "spider things",
        "character_id": 1
    },
    {
        "name": "spider webs",
        "ability_desc": "sticky webs",
        "character_id": 1
    },
    {
        "name": "spider legs",
        "ability_desc": "can climb walls and hang on ceiling",
        "character_id": 1
    }
]

const seedAbilities = () => Abilities.bulkCreate(abilitiesData);

module.exports = seedAbilities