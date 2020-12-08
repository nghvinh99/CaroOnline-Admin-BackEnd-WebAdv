const passport = require('passport');
const { ExtractJwt } = require('passport-jwt');

const jwtStrategy = require('passport-jwt').Strategy;
const jwtExtract = require('passport-jwt').ExtractJwt;
const Admin = require('../admins/adminModel');

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_OR_KEY;

passport.use(new jwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const admin = await Admin.findOne({ id: jwt_payload.sub });
    if (admin) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    throw err;
  }
}))