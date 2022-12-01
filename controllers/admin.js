const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;  
    const price = req.body.price;
    const description = req.body.description;

    // Product.create({
    //     title: title,
    //     price: price,
    //     imageUrl: imageUrl,
    //     description: description,
    //     userId: req.user.id
    // })
    // .then(result => console.log('Created Product!!!'))
    // .catch(err => console.log(err))

    req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
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
    Product.findAll()
    .then(products => {
        // console.log(products)
        return res.json(products);
    })
    .catch(err => console.log(err))
}


exports.postEditProduct = (req, res, next) => {
    // console.log('body', req.body);
    const prodId = req.body.id;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    // console.log(prodId, updatedTitle, updatedPrice, updatedImageUrl, updatedDesc)
    Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      console.log('product', product);
      return product.save();
    })
    .then(result => {
      console.log('Updated Product!!!');
    })
    .catch(err => console.log('Edit error:', err)); 

}

exports.postDeleteProduct = (req, res, next) => {   
    const prodId = req.body.productId; 
    // Product.deleteById(prodId); 
    Product.findByPk(prodId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('Deleted Product!!!');
    })
    .catch(err => console.log(err))
}
