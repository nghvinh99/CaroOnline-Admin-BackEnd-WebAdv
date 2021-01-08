const passport = require('./local-strategy');
const jwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Admin = require('../admins/adminModel');

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_OR_KEY;

passport.use(new jwtStrategy(opts, async function (jwt_payload, done) {
  try {
    const admin = await Admin.findOne({
      where: {
        id: jwt_payload.id
      }
    });
    if (admin) {
      return done(null, admin);
    } else {
      return done(null, false);
    }
  } catch (err) {
    throw err;
  }
}))

module.exports = passport;