// set up router, models, and authorizeUser middleware
const router = require('express').Router();
const { User, Character, Abilities } = require('../models');
const authorizeUser = require ('../utils/auth');

// render user's personal profile, which contains all the user's characters
router.get('/profile', authorizeUser, async (req, res) => {
    try {
        // find logged in user based on active session ID
        const userData = await User.findByPk(req.session.user_id, {
            // do not check/
        })
    }
})