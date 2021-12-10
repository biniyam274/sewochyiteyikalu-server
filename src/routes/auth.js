const express = require('express');
const actions = require('../controllers/auth');

const router = express.Router();


router.post('/signup',  actions.signup);

router.post('/login', actions.login);

module.exports = router;