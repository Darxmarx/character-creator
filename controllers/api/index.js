const router = require ('express').Router();

const userRoutes = require('./user-routes');
const characterRoutes = require('./character-routes');
const abilitiesRoutes = require('./abilities-routes');

router.use('/user', userRoutes);
router.use('/character', characterRoutes);
router.use('/abilities', abilitiesRoutes);

module.exports = router; 