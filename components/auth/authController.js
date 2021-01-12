const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const adminModel = require('../admins/adminModel');


const authController = {}

authController.sendVerifyMail = async function (req, res, next) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nhvinh604@gmail.com',
      pass: 'khongcomatkhau'
    }
  });

  var mailOptions = {
    from: 'nhvinh604@gmail.com',
    to: 'nguyenhuuvinhbtbt@gmail.com',
    subject: 'Confirm mail',
    text: 'Test'
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      res.end
    } else {
      res.send('Email sent: ' + info.response);
    }
  });
}

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