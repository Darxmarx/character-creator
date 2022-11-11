const router = require('express').Router();
const { User, Character, Abilities } = require('../../models');
const authorizeUser = require('../../utils/auth');

// get all abilities associated with a character
router.get('/:character_id', async (req, res) => {
    try {
        const abilitiesData = await Abilities.findAll({
            where: {
                character_id: req.params.character_id,
            }
        });

        res.status(200).json(abilitiesData);

        if(!abilitiesData) {
            res.status(404).json({message: 'no abilities found for that character_id'});
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:character_id/', async (req, res) => {
    try {
        const abilityData = await Abilities.create({
            name: req.body.name,
            ability_desc : req.body.desc,
            character_id: req.params.character_id
        });

        if(!abilityData) {
            res.status(400).json({message: 'could not make ability for specified character'});
            return;
        }

        res.status(200).json(abilityData);

    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router;