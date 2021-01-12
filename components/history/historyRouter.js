const express = require('express');
const historyController = require('./historyController');
const router = express.Router();

/* GET users listing. */
router.get('/', historyController.getHistory);

router.get('/game', historyController.getGameData);

router.get('/player', historyController.getPlayerGames);

module.exports = router;
