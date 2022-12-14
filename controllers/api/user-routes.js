// set up router and models required
const router = require('express').Router();
const { User, Character } = require('../../models');

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
    } catch (err) { // 500 error in case anything goes wrong server-side
        res.status(500).json(err);
    }
});

// POST route for existing user to login
router.post('/login', async (req, res) => {
    try {

        // user data is searched for within the database
        const userData = await User.findOne({ where: { email: req.body.email } });

        // if user's email is not found within the DB, return a 400 error
        // for security reasons, website does not specify if it was specifically the email or the password that was incorrect
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Sorry, incorrect email or password was entered. Please try again with valid credentials.'} );
            return;
        }

        // check user's inputted password to see if its hashed equivalent is in the DB
        const validPw = userData.checkPassword(req.body.password);

        // if password is wrong, return a 400 error
        // for security reasons, website does not specify if it was specifically the email or the password that was incorrect
        if (!validPw) {
            res
                .status(400)
                .json({ message: 'Sorry, incorrect email or password was entered. Please try again with valid credentials.'} );
            return;
        }

        // if both email and password are valid, save the new session as logged in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'Successfully logged in!' });
        });
    } catch (err) { // returns 500 error if anything else goes wrong 
        res.status(500).json(err);
    }
});

// POST route that enables user to log out
router.post('/logout', (req, res) => {
    // if logged_in is set to true, end the session, thus logging out the user
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else { // display 500 error in case something goes wrong somehow
        req.status(500).end();
    }
});

// export the data here for use elsewhere via router
module.exports = router;
