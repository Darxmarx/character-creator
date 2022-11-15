// set up router, models, and authorizeUser middleware
const router = require('express').Router();
const { User, Character } = require('../models');
const authorizeUser = require('../utils/auth');

router.get('/', authorizeUser, async (req, res) => {
    try {
        if (req.session.logged_in) {
            res.redirect('/user_list');
            return;
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/user_list');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/user_list');
        return;
    }

    res.render('login');
});

router.get('/characters', (req, res) => {
    try {
        res.render('new-character');
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/user', async (req, res) => {
    try {
        const userCharacters = await Character.findAll({
            where: {
                user_id: req.session.user_id
            },

        });

        const characterList = userCharacters.map((character) => character.get({ plain: true }));

        res.render('profile', {
            characterList,
            logged_in: true
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

router.get('/user_list', async (req, res) => {
    try {
        const userListData = await User.findAll({
            attributes: { exclude: ['password', 'email'] }
        });

        console.log(userListData);

        const userlist = userListData.map((user) => user.get({ plain: true }));

        console.log(typeof userlist + "@@@@@@@@@@@@@@@@@");
        console.log(userlist + "@@@@@@@@@@@@@@@@@");

        res.render('useraccount', {
            userlist,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/user/:user_id/characters', async (req, res) => {
    try {
        const userCharacters = await Character.findAll({
            where: {
                user_id: req.params.user_id
            },
        });

        const characterList = userCharacters.map((character) => character.get({ plain: true }));

        res.render('users-characters', {
            characterList,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// export data for use elsewhere
module.exports = router;
