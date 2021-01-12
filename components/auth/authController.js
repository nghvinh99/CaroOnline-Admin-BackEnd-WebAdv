const jwt = require('jsonwebtoken');
const adminModel = require('../admins/adminModel');

const authController = {}

authController.logIn = function (req, res, next) {
  const user = req.user;
  const payload = {
    id: user.id
  }
  const token = jwt.sign(payload, process.env.JWT_SECRET_OR_KEY, { expiresIn: '30m' });
  res.send(token);
}

authController.profile = async function (req, res, next) {
  const id = req.query.id;
  try {
    const admin = await adminModel.getProfile(id);
    res.send(admin);
  } catch (err) {
    throw err;
  }
}

authController.changePassword = async function (req, res, next) {
  const info = req.body;
  console.log(req.body);
  try {
    const admin = await adminModel.changePassword(info);
    res.send(admin);
  } catch (err) {
    throw err;
  }
}

module.exports = authController;