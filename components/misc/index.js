const express = require('express');
const router = express.Router();
const userModel = require('../users/usersModel');
const historyModel = require('../history/historyModel');

/* GET home page. */
router.get('/info', async function (req, res, next) {
  const userCount = await userModel.count();
  const gameCount = await historyModel.count();
  res.send({
    user: userCount,
    game: gameCount,
  })
});

module.exports = router;
