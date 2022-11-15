// const { json } = require('body-parser');
// const fs = require('fs');
// const path = require('path');
// const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');
// const products = [];
const Product = require('../models/product')

exports.postAddProduct = (req, res, next) => {
    console.log('postAddProduct',req.body);
    const title = req.body.title;
    const imageurl = req.body.imageurl; 
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null, title, imageurl, description, price);
    console.log('product',product);
    product.save();
}

exports.getAddProduct = (req, res, next) => {
    // Product.fetchAll( products => {
    //     return res.json(products);
    // });
    Product.fetchAll()
    .then(( [rows, fielData] ) => {
        return res.json(rows)
    })
    .catch(err => console.log(err))
}


// exports.getEditProduct = (req, res, next) => {
//     const prodId = req.body;
//     Product.findById( prodId, product => {
//         return res.json(product);
//     })
// }

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageurl;
    const updatedDesc = req.body.description;
    // console.log(updatedImageUrl); 
    const updatedProduct = new Product(
        prodId,
        updatedTitle,
        updatedImageUrl,
        updatedDesc,
        updatedPrice
    );

    updatedProduct.save();
    // res.redirect('/admin/products');

}

exports.postDeleteProduct = (req, res, next) => {   
    // console.log(req.body);
    const prodId = req.body.productId;
    Product.deleteById(prodId);  
}
