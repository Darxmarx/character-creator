const router = require('express').Router();
const { User, Character, Abilities } = require('../../models');
const authorizeUser = require('../../utils/auth');


router.post('/', authorizeUser, async (req, res) => {
    try {


        // return status 200 upon successful creation
        res.status(200).json(newChar);
    } catch (err) { // 500 error if something goes wrong server-side
        res.status(500).json(err);
    }
});

module.exports = router;