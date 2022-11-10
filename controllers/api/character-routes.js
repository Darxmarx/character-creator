// set up router, models required, and authorizeUser
const router = require('express').Router();
const { User, Character, Abilities } = require('../../models');
const authorizeUser = require('../../utils/auth');

// GET route that retrieves all characters
router.get('/', authorizeUser, async (req, res) => {
    try {
        // finds all sets of data in the Character model, making sure to include abilities data from the Abilities model
        const charData = await Character.findAll({
            include: [{ model: Abilities }]
        });

        // return status 200 upon successful retrieval
        res.status(200).json(charData);
    } catch (err) { // 500 error if something goes wrong server-side
        res.status(500).json(err);
    }
});

// GET route that retrieves specific character by ID in Character model
router.get('/:id', authorizeUser, async (req, res) => {
    try {
        // finds set of data in Character model by ID, including that character's abilities stored in the Abilities model
        const charData = await Character.findByPk(req.params.id, {
            include: [{ model: Abilities }]
        });

        // if character data doesn't exist, return error
        if (!charData) {
            res.status(404).json({ message: 'No character found with this ID!'} );
        }

        // return status 200 upon successful retrieval
        res.status(200).json(charData);
    } catch (err) { // 500 error if something goes wrong server-side
        res.status(500).json(err);
    }
});

// POST route that creates new character in Character model
router.post('/', authorizeUser, async (req, res) => {
    try {
        // creates new character based on *all* data found within the req.body (all input fields)
            // and sets the user_id of the character to match the creator's id
        const newChar = await Character.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        // return status 200 upon successful creation
        res.status(200).json(newChar);
    } catch (err) { // 500 error if something goes wrong server-side
        res.status(500).json(err);
    }
});

// PUT route that edits a specific character by ID in Character model
router.put('/:id', authorizeUser, async (req, res) => {
    // update character in the DB based on new information in the req.body, with the requested ID in the url
    try {
        const charData = await Character.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        // if character doesn't exist somehow, return error
        if (!charData) {
            res.status(404).json({ message: 'No character found with this ID!' });
            return;
        }

        // return status 200 upon successful update
        res.status(200).json(charData);
    } catch (err) { // 500 error if something goes wrong server-side
        res.status(500).json(err);
    }
});

// DELETE route that deletes specific character by ID in Character model
router.delete('/:id', authorizeUser, async (req, res) => {
    // delete a character by its "id" value
    try {
        const charData = await Character.destroy({
            where: {
                id: req.params.id
            }
        });

        // return error if character ID doesn't exist
        if (!charData) {
            res.status(404).json({ message: 'No character found with this ID!' });
            return;
        }

        // return status 200 upon successful update
        res.status(200).json(charData);
    } catch (err) { // 500 error if something goes wrong server-side
        res.status(500).json(err);
    }
});

// export functions here for use elsewhere
module.exports = router;
