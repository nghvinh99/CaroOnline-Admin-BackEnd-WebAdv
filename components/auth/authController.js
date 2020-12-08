const jwt = require('jsonwebtoken');

const authController = {}

authController.logIn = function (req, res, next) {
  const user = req.user;
  const payload = {
    id: user.id
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET_OR_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME + 'm' });
  const expiredTime = process.env.JWT_EXPIRE_TIME * 60 * 1000;
  res.cookie('Authorization', token, { maxAge: expiredTime, httpOnly: true });
  res.cookie('Login', true, { maxAge: expiredTime, httpOnly: false });
  res.sendStatus(200);
}

authController.logOut = function (req, res, next) {
  const expiredTime = 0;
  res.cookie('Authorization', '', { maxAge: expiredTime, httpOnly: true });
  res.cookie('Login', false, { maxAge: expiredTime, httpOnly: false });
  res.sendStatus(200);
}

module.exports = authController;