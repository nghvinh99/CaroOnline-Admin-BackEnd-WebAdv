const jwt = require('jsonwebtoken');

const authController = {}

authController.login = function (req, res, next) {

  res.send("Logged In")
}

module.exports = authController;