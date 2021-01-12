const express = require('express');
const router = express.Router();
const usersController = require('./usersController');

/* GET users listing. */
router.get('/', usersController.getUsers);

router.get('/user', usersController.getOneUser);

router.get('/all-player-names', usersController.getAllPlayerNames);

router.get('/block', usersController.blockUser);

module.exports = router;
