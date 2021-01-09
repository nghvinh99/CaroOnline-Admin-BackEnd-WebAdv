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
  }
}