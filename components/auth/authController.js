const jwt = require('jsonwebtoken');

const authController = {}

authController.logIn = function (req, res, next) {
  const user = req.user;
  const payload = {
    id: user.id
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET_OR_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME + 'm' });
  res.send(token);
}

authController.logOut = function (req, res, next) {
  res.sendStatus(200);
}

module.exports = authController;