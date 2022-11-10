// set up authorizeUser middleware
const authorizeUser = (req, res, next) => {
    // if the session does not have a valid user logged in, automatically redirect the url to be taken to the login page
    if (!req.session.user_id) {
        res.redirect("/login");
    } else {
        next(); // performs the next middleware, if applicable
    }
}

// export the authorizeUser middleware for use elsewhere in the code
module.exports = authorizeUser;
