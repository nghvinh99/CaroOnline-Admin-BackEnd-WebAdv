const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../admins/adminModel');

passport.use(new LocalStrategy(
  async function (username, password, done) {
    try {
      const admin = await Admin.findOne({
        where: {
          username: username
        }
      });
      if (admin === null) {
        return done(null, false);
      }
      if (!(await admin.validatePassword(password))) {
        return done(null, false);
      }
      return done(null, admin);
    } catch (err) {
      throw err;
    }
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    user = {
      id: '1',
      username: 'todo',
      password: 'todo'
    }
    if (id === user.id) {
      done(null, user);
    }
    done(null, null);
  } catch (err) {
    throw err;
  }
});

module.exports = passport;