const usersModel = require('./usersModel');

module.exports = usersController = {
  getUsers: async (req, res, next) => {
    try {
      const users = await usersModel.getUsersList();
      res.send(users);
    } catch (err) {
      throw err;
    }
  }
}