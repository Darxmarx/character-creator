const {Character} = require('../models');
const characterData =

[
    {
     "name": "spiderman",
     "alignment": "lawful good",
     "personality": "good person",
     "physical_description": "red suit",
     "image": "https://res.cloudinary.com/dnqaq9up8/image/upload/v1668367888/signed_upload_demo_uw/fcnwnbz3osmbvteg2vvm.png",
     "backstory": "Bit by radioactive spider",
     "abilities_id": 1,
     "user_id": 1
    }
]
  
const seedCharacter = () => Character.bulkCreate(characterData);

module.exports = seedCharacter;