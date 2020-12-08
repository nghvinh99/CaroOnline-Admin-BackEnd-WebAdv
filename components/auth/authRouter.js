const router = require('express').Router();
const passport = require('./jwt-strategy');
const authController = require('./authController');

// router.get('/login', function (req, res, next) {
//   res.send('please Login!');
// });

// router.get('/test', passport.authenticate('jwt'), function (req, res, next) {
//   res.send('OK');
// });

router.post('/login', passport.authenticate('local'), authController.logIn);

router.get('/logout', passport.authenticate('jwt'), authController.logOut);


module.exports = router;
