const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const adminModel = require('../admins/adminModel');
const crypto = require('crypto-random-string');

const authController = {}

authController.changeEmail = async function (req, res, next) {
  const info = req.body;
  console.log(info);
  try {
    const admin = await adminModel.changeEmail(info);
    res.send(info.email);
  } catch (err) {
    throw err;
  }
}

authController.resetPassword = async function (req, res, nex) {
  const pass = req.body.password;
  const token = req.params.token;
  let status;
  try {
    const admin = await adminModel.resetPassword(token, pass);
    if (admin > 0) {
      status = "OK";
    } else {
      status = "Failed";
    }
  } catch (err) {
    throw err;
  }
  res.send(status);
}

authController.resetPasswordReq = async function (req, res, next) {
  const email = req.body.email;
  const token = (crypto({ length: 60, type: 'url-safe' }));
  try {
    const admin = await adminModel.resetPasswordReq(email, token);
    let status = "Failed";

    if (admin > 0) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'nhvinh604@gmail.com',
          pass: 'khongcomatkhau'
        }
      });

      var mailOptions = {
        from: 'nhvinh604@gmail.com',
        to: email,
        subject: '[Caro online] Reset password',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          process.env.ALLOW_ORIGIN + '/auth/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };

      transporter.sendMail(mailOptions);
      status = "OK";
    }
    res.send(status);
  } catch (err) {
    throw err;
  }

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
  try {
    const admin = await adminModel.changePassword(info);
    res.send(admin);
  } catch (err) {
    throw err;
  }
}

module.exports = authController;