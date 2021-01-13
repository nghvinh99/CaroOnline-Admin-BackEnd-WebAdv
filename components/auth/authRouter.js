const router = require('express').Router();
const passport = require('./jwt-strategy');
const authController = require('./authController');

router.post('/login', passport.authenticate('local'), authController.logIn);

router.get('/profile', passport.authenticate('jwt'), authController.profile);

router.post('/change-password', passport.authenticate('jwt'), authController.changePassword);

router.post('/change-email', passport.authenticate('jwt'), authController.changeEmail);

router.post('/reset-password', authController.resetPasswordReq);

router.post('/reset-password/:token', authController.resetPassword);


module.exports = router;
