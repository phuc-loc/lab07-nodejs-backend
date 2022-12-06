const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

router.post('/add-product', adminController.postAddProduct ); 

router.get('/add-product', adminController.getAddProduct); //hien thi products

router.post('/edit-product', adminController.postEditProduct);

router.post('/delete-product', adminController.postDeleteProduct);

module.exports = router;   