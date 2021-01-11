const historyModel = require('./historyModel');

module.exports = historyController = {
  getHistory: async (req, res, next) => {
    const filter = req.query;
    try {
      const history = await historyModel.getHistoryList();
      res.send(history);
    } catch (err) {
      throw err;
    }
  },
  getGameData: async (req, res, next) => {
    const id = req.query.gameId;
    try {
      const history = await historyModel.getGameData(id);
      res.send(history);
    } catch (err) {
      throw err;
    }
  }
}