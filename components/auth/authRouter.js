const router = require('express').Router();
const passport = require('./jwt-strategy');
const authController = require('./authController');

router.post('/login', passport.authenticate('local'), authController.logIn);

router.get('/profile', passport.authenticate('jwt'), authController.profile);

router.post('/change-password', passport.authenticate('jwt'), authController.changePassword);


module.exports = router;
