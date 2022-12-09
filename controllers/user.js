const Product = require('../models/product');
const Order = require('../models/order')

//CART
//1. tra ve React khi fetch
exports.getCart = (req, res, next) => {
  req.user
  //   .getCart()
  //   .then(products => {
  //     return res.json(products)
  //   })
  //   .catch(err => console.log(err));
  .populate('cart.items.productId')
  .then(user => {
    // console.log('//user', test)
    const products = user.cart.items;
    return res.json(products)
  })
  .catch(err => {
    console.log(err);
  })
};

//2. nhan tu React khi post
exports.postCart = (req, res, next) => {
  const prodId = req.body.id;
  Product
    .findById(prodId)
    .then(product => {
      return req.user
        .addToCart(product)
    })
    .then(result => {
      console.log(result);
    })
};

//3. xoa cart
exports.postDeleteCartItem = (req, res, next) => {
  console.log("req.body", req.body)
  const prodId = req.body.id;
  req.user
    .deleteItemFromCart(prodId)
    .then((result) => {
      console.log('Deleted!!')
    })
    .catch(err => console.log(err));
}

//ORDER
//1. 
exports.postOrder = (req, res, next) => {
  req.user
    // .addOrder()
    .populate('cart.items.productId')
    .then(user => {

      const products = user.cart.items.map(i => {
        return {
          quantity: i.quantity,
          product: {...i.productId._doc} //chu y: nếu để trong map phải thêm _doc
        }
      })//

      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        products: products
      })//

      return order.save() //??
    })
    .then((result) => {
      // console.log('1 order added!!')
      req.user.clearCart();
    })
    .catch(err => console.log(err));
};


//2. get order
exports.getOrders = (req, res, next) => {
  // req.user
  //   .getOrders()
  Order 
  .find()
  // .find({'user.userId': req.user._id})
    .then(orders => {
      return res.json(orders)
    })
    .catch(err => console.log(err));
};


