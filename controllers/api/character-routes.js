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

        res.status(200).json(newChar);
    } catch (err) { // if user fails to properly fill in character data, return 400 error
        res.status(400).json(err);
    }
});