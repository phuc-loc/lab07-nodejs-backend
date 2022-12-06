const Product = require('../models/product');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const User = require('../models/user')


exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, price, description, imageUrl, null, req.user._id)
  console.log('//product in controller', product)
  product.save()
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err); 
    });

}

exports.getAddProduct = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      // console.log(products)
      return res.json(products);
    })
    .catch(err => console.log(err))
}

//Edit
exports.postEditProduct = (req, res, next) => {
  console.log('body', req.body);
  const prodId = req.body.id;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // console.log(prodId, updatedTitle, updatedPrice, updatedImageUrl, updatedDesc)
  // Product.findByPk(prodId)
  // .then(product => {
  //   product.title = updatedTitle;
  //   product.price = updatedPrice;
  //   product.imageUrl = updatedImageUrl;
  //   product.description = updatedDesc;
  //   console.log('product', product); 
  //   return product.save();
  // })
  const product = new Product(updatedTitle, updatedPrice, updatedDesc, updatedImageUrl, new ObjectId(prodId));
  console.log('//product', product)
  product.save()
    .then(result => {
      console.log('//result', result)
      console.log('Updated Product!!!');
    })
    .catch(err => console.log('Edit error:', err));

}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(req.body)
  // Product.deleteById(prodId); 
  Product.deleteById(prodId)
    .then(() => {
      console.log('Deleted from controller!')
    })
    .catch(err => console.log(err))
}
