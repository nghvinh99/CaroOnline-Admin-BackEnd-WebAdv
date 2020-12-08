const router = require('express').Router();
const passport = require('./local-strategy');
const authController = require('./authController');

router.get('/login', function (req, res, next) {
  res.send('please Login!');
});

router.post('/login', passport.authenticate('local'), authController.login);

router.get('/logout', function (req, res) {
  req.logout();
  console.log(req.isAuthenticated());
  console.log(req.user);
  res.redirect('/');
});


module.exports = router;
