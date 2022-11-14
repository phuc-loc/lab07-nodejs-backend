const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/cart', userController.getCart);

router.post('/cart', userController.postCart);

module.exports = router; 