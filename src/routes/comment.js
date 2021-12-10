const express = require('express');
const actions = require('../controllers/comments.js');
const checkAuth = require('../services/auth');
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/all',checkAuth, actions.getComments);
router.post('/',checkAuth, actions.postComment);
router.get('/',checkAuth, actions.getComment);
router.put('/',checkAuth, actions.putComment);
router.delete('/',checkAuth, actions.deleteComment);

module.exports = router;