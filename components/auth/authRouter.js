const router = require('express').Router();
const passport = require('./jwt-strategy');
const authController = require('./authController');

router.post('/login', passport.authenticate('local'), authController.logIn);

router.get('/logout', passport.authenticate('jwt'), authController.logOut);


module.exports = router;
