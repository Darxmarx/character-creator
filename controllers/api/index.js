const router = require ('express').Router();

const userRoutes = require('./user-routes');
const characterRoutes = require('./character-routes');
const signuploadwidgetRouter = require('./widget-sign-route')

router.use('/user', userRoutes);
router.use('/character', characterRoutes);
router.use('/widget', signuploadwidgetRouter);

module.exports = router; 
