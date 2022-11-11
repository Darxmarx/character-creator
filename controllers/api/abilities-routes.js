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

        if(!abilitiesData) {
            res.status(404).json({message: 'no abilities found for that character_id'});
            return;
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', authorizeUser, async (req, res) => {

});

module.exports = router;