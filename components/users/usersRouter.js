const express = require('express');
const router = express.Router();
const usersController = require('./usersController');

/* GET users listing. */
router.get('/', usersController.getUsers);

router.get('/block', usersController.blockUser);

module.exports = router;
