const express = require('express');
const actions = require('../controllers/posts');
const checkAuth = require('../services/auth');
const upload = require('../helpers/multer');
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/all',checkAuth, actions.getPosts);
router.post('/getComments',checkAuth, actions.getComments);
router.post('/getLikes',checkAuth, actions.getLikes);
router.get('/getByCategoryId',checkAuth, actions.getByCategoryId);
router.get('/',checkAuth, actions.getPost);
router.post('/',checkAuth, actions.postPost);
router.put('/',checkAuth, actions.putPost);
router.delete('/',checkAuth, actions.deletePost);

module.exports = router;