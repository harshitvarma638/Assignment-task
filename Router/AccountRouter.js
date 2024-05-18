const express = require('express');
const {CreateAccount,ShowUsers} = require('../Controller/AccountController');

const router = express.Router();

router.post('/accountCreation', CreateAccount);

module.exports = router;