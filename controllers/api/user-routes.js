// set up router and models required
const router = require('express').Router();
const { User, Character, Abilities } = require('../../models');

// POST route that creates new user for the User model
router.post('/', async (req, res) => {
    try {
        // new user data is created in the model based on the req.body
        const userData = await User.create(req.body);

        // upon creating the user, automatically log the user in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData); // sets up new user data as a JSON object
        });
    } catch (err) { // if user enters invalid credentials, returns 400 error
        res.status(400).json(err);
    }
});

// 