const express = require('express');
const actions = require('../controllers/users');
const checkAuth = require('../services/auth');
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/all',checkAuth, actions.getUsers);
router.get('/',checkAuth, actions.getUser);
router.put('/',checkAuth, actions.putUser);
router.delete('/',checkAuth, actions.deleteUser);

module.exports = router;