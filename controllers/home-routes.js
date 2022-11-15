// set up router, models, and authorizeUser middleware
const router = require('express').Router();
const { User, Character } = require('../models');
const authorizeUser = require('../utils/auth');

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


        // const userData = await User.findAll({
        //     include: [
        //         {
        //             attributes: ['name'],
        //         }
        //     ]
        // })

        // const users = userData.map((user) => user.get({ plain: true }));

        // console.log(user);

        // res.render('users', {
        //     users,
        //     logged_in: req.session.logged_in,
        // })

        // when the user logs in we want them to be able to see the characters they made
        // res.render('users')

        if (req.session.logged_in) {
            res.redirect('/user_list');
            return;
        }

    } catch (err) {
        res.status(500).json(err);
    }
})


router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/user_list');
        return;
    }

    res.render('login')
})

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/user_list');
        return;
    }

    res.render('login')
})

router.get('/characters', (req, res) => {
    try {
        res.render('new-character');
    } catch(err) {
        res.status(400).json(err);
    }
})

router.get('/user', async (req, res) => {
    try {
        const userCharacters = await Character.findAll({
            where: {
                user_id: req.session.user_id
            },

        })


        const characterList = userCharacters.map((character) => character.get({ plain: true }));

        res.render('users-characters', {
            characterList,
            logged_in: true
        })
    } catch(err) {
        // res.redirect('/login');
        res.status(400).json(err);
    }

})

router.get('/user_list', async (req, res) => {
    try {

        const userListData = await User.findAll({
            // attributes: ["id", "name"]
            attributes: { exclude: ['password', 'email'] }
        })

        console.log(userListData);

        // const userlist = userListData.get({ plain: true });
        const userlist = userListData.map((user) => user.get({ plain: true }));

        console.log(typeof userlist + "@@@@@@@@@@@@@@@@@");
        console.log(userlist + "@@@@@@@@@@@@@@@@@");

        res.render('useraccount', {
            userlist,
            logged_in: true
        })

    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/user/:user_id/characters', async (req, res) => {
    try {
        const userCharacters = await Character.findAll({
            where: {
                user_id: req.params.user_id
            },

        })


        const characterList = userCharacters.map((character) => character.get({ plain: true }));

        res.render('users-characters', {
            characterList,
            logged_in: true
        })

    } catch (err) {
        res.status(500).json(err);
    }
})



// export data for use elsewhere
module.exports = router;
