const usersModel = require('./usersModel');

module.exports = usersController = {
  getUsers: async (req, res, next) => {
    const filter = req.query;
    try {
      const users = await usersModel.getUsersList(filter);
      res.send(users);
    } catch (err) {
      throw err;
    }
  },
  getAllPlayerNames: async (req, res, next) => {
    try {
      const names = await usersModel.getAllPlayerNames();
      res.send(names);
    } catch (err) {
      throw err;
    }
  },
  getOneUser: async (req, res, next) => {
    const userId = req.query.userId;
    try {
      const user = await usersModel.getOneUser(userId);
      res.send(user);
    } catch (err) {
      throw err;
    }
  },
  blockUser: async (req, res, next) => {
    const userId = req.query.userId;
    try {
      const response = await usersModel.flipStatus(userId);
      res.send(response);
    } catch (err) {
      throw err;
    }
  }
}