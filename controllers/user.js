const Product = require('../models/product');
// const User = require('../models/user');


//tra ve React khi fetch
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    // .then(cart => {
    //   return cart.getProducts()
        .then(products => {
          // console.log('//products', products)
          return res.json(products)
        })
        .catch(err => console.log(err));
  
};

//nhan tu React khi post
exports.postCart = (req, res, next) => {
  // const prodId = req.body.id;
  // req.user
  //   .getCart()
  //   .then(cart => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then(products => {
  //     let product;
  //     if (products.length > 0) {
  //       product = products[0];
  //     }
  //     if (product) {
  //       const oldQuantity = product.cartItem.quantity;
  //       newQuantity = oldQuantity + 1;
  //       return product;
  //     }
  //     return Product.findByPk(prodId);
  //   })
  //   .then(product => {
  //     return fetchedCart.addProduct(product, {
  //       through: { quantity: newQuantity }
  //     });
  //   })
  //   .catch(err => console.log(err)); 
  const prodId = req.body.id;

  Product.findById(prodId).then(product => {
    return req.user.addToCart(product)
  })
  .then(result => {
    console.log(result);
  })
};

// xoa cart
exports.postDeleteCartItem = (req, res, next) => {
  // console.log("req.body")
  const prodId = req.body.id;
  req.user 
  // .then(cart => { 
  //   return cart.getProducts({ where: { id: prodId } });
  // })
  // .then(products => {
  //   const product = products[0];
  //   return product.cartItem.destroy();
  // })
  .deleteItemFromCart(prodId)
  .then(() => {
    console.log('Deleted!!')
  })
  .catch(err => console.log(err));
}

//ORDER

//post order
exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then((result) => {
      console.log('1 order added!!')
    })
    .catch(err => console.log(err));
};


//get order
exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {

      return res.json(orders)
    
    })
    .catch(err => console.log(err));
};


