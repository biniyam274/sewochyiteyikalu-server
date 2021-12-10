const express = require('express');
const actions = require('../controllers/likes.js');
const checkAuth = require('../services/auth');
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/likeByComment', actions.getByComment);
router.get('/likeByPost', actions.getByPost);
router.post('/',checkAuth, actions.postLike);

module.exports = router;