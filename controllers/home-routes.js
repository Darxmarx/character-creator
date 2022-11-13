// set up router, models, and authorizeUser middleware
const router = require('express').Router();
const { User, Character, Abilities } = require('../models');
const authorizeUser = require ('../utils/auth');

// render user's personal profile, which contains all the user's characters
router.get('/profile', authorizeUser, async (req, res) => {
    try {
        // find logged in user based on active session ID
        const userData = await User.findByPk(req.session.user_id, {
            // do not retrieve password for security reasons
            attributes: { exclude: ['password'] },
            // retrieve character data associated with user
            include: [{ model: Character }]
        });

        // serialize data to plain text so template can read it
        const user = userData.get({ plain: true });

        // pass data and session to template
        res.render('profile', {
            ...user,
            logged_in: true
        });
    } catch (err) { // 500 error if server-side issue
        res.status(500).json(err);
    }
});

// export data for use elsewhere
module.exports = router;
