const jwt = require('jsonwebtoken');

const authController = {}

authController.logIn = function (req, res, next) {
  const user = req.user;
  const payload = {
    id: user.id
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET_OR_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME + 'm' });
  const expiredTime = process.env.JWT_EXPIRE_TIME * 60 * 1000;
  const cookieOpts = {
    maxAge: expiredTime,
    sameSite: 'none',
    secure: true,
    domain: process.env.ALLOW_ORIGIN
  }
  res.cookie('Authorization', token, { ...cookieOpts, httpOnly: true });
  res.cookie('Login', true, { ...cookieOpts, httpOnly: false });
  res.sendStatus(200);
}

authController.logOut = function (req, res, next) {
  const expiredTime = 0;
  const cookieOpts = {
    maxAge: expiredTime,
    sameSite: 'none',
    secure: true
  }
  res.cookie('Authorization', '', { ...cookieOpts, httpOnly: true });
  res.cookie('Login', false, { ...cookieOpts, httpOnly: false });
  res.sendStatus(200);
}

module.exports = authController;