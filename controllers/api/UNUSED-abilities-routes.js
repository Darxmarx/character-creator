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

// creates an ability using the character_id as a parameter
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

// edit a characters ability using character_id and ability_id as parameters
router.put('/:character_id/:ability_id', async (req, res) => {
    try {
        const updatedAbility = await Abilities.findOne({
            where: {
                character_id: req.params.character_id,
                id: req.params.ability_id
            }
        });

        if(!updatedAbility) {
            res.status(400).json({messge: 'Could not find and update specific ability'})
            return;
        }

        res.status(200).json(updatedAbility);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete specific ability using character_id, and ability_id as parameters
router.delete('/:character_id/:ability_id', async (req, res) => {
    try {
        const deleteAbility = await Abilities.findOne({
            where: {
                character_id: req.params.character_id,
                id: req.params.ability_id
            }
        });

        if(!deleteAbility) {
            res.status(400).json({message: 'Could not find ability to delete'})
            return;
        }

        res.status(200).json(deleteAbility);

    } catch (err) {
        res.status(500).json(err);
    }
}) 

module.exports = router;
