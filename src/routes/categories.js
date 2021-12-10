const express = require('express');
const actions = require('../controllers/categories.js');
const checkAuth = require('../services/auth');
const router = express.Router();

//Lets say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
router.get('/all',checkAuth, actions.getCategories);
router.post('/',checkAuth, actions.postCategory);
router.put('/',checkAuth, actions.putCategory);
router.delete('/',checkAuth, actions.deleteCategory);

module.exports = router;