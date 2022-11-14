// set up router, models, and authorizeUser middleware
const router = require('express').Router();
const { User, Character, Abilities } = require('../models');
const authorizeUser = require ('../utils/auth');

// TODO: commented out for now, please continue
// render user's personal profile, which contains all the user's characters
// router.get('/profile', authorizeUser, async (req, res) => {
//     try {
//         // find logged in user based on active session ID
//         const userData = await User.findByPk(req.session.user_id, {
//             // do not check/
//         })
//     }
// })

router.get('/', authorizeUser, async (req, res) => {
    try {
        
        
        const userData = await User.findAll({
            include: [
                {
                    attributes: ['name'],
                }
            ]
        })

        const users = userData.map((user) => user.get({plain: true}));

        console.log(user);

        // res.render('users', {
        //     users,
        //     logged_in: req.session.logged_in,
        // })

        // when the user logs in we want them to be able to see the characters they made
        // res.render('users')
        res.redirect('/user')
    } catch(err) {
        res.status(500).json(err);
    }
})


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login')
})

router.get('/characters', (req, res) => {
    res.render('new-character');
})

router.get('/user', (req, res) => {
    res.render('users')
})



// export data for use elsewhere
module.exports = router;
