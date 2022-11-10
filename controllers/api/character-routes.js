// set up router, models required, and authorizeUser
const router = require('express').Router();
const { User, Character, Abilities } = require('../../models');
const authorizeUser = require('../../utils/auth');

// POST route that creates new character in Character model
router.post('/', authorizeUser, async (req, res) => {
    try {
        const newChar = await Character.create({
            // creates new character based on *all* data found within the req.body (all input fields)
            // and sets the user_id of the character to match the creator's id
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
