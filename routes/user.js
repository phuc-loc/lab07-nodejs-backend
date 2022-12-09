const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/cart', userController.getCart);

router.post('/cart', userController.postCart);

router.post('/delete-cart-item', userController.postDeleteCartItem)

router.post('/create-order', userController.postOrder)

router.get('/orders', userController.getOrders);
 
module.exports = router;