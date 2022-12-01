const Product = require('../models/product');
const Cart = require('../models/cart');

// //xem thử trong file json có DL chưa ???
// exports.getCart = (req, res, next) => {
//     Cart.getCart(cart => {
//       Product.fetchAll( products => {
//         const cartProducts = [];
//         for (product of products) { 

//           const cartProductData = cart.products.find(
//             prod => prod.id === product.id
//           );

//           if (cartProductData) {
//             cartProducts.push({ productData: product, qty: cartProductData.qty });
//           }

//         }
//         return res.json(cartProducts) 
//       });
//     });
//   }; 
  

// //   //ghi vào file json 
//   exports.postCart = (req, res, next) => {
//     const prodId = req.body.id;
//     console.log(prodId);
//     Product.findByPk(prodId, product => {
//       Cart.addProduct(prodId, product.price);
//     });
//   }

//tra ve React khi fetch
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts()
        .then(products => {
          // console.log('//products', products)
          return res.json(products)
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

//nhan tu React khi post
exports.postCart = (req, res, next) => {
  const prodId = req.body.id;
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      let product;
      if (products.length > 0) {
        product = products[0];
      }
      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(prodId);
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity }
      });
    })
    // .then(() => {
    //   res.redirect('/cart');
    // })
    .catch(err => console.log(err));
};


//ORDER
//post order
exports.postOrder = (req, res, next) => {
  let fetchedCart;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts();
    })
    .then(products => {
      // console.log('//products', products)
      return req.user
        .createOrder() //chu y
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => console.log(err));
    })
    .then(result => {
      return fetchedCart.setProducts(null);
    })
    // .then(result => {
    //   res.redirect('/orders');
    // })
    .catch(err => console.log(err));
};


//get order
exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({include: ['products']})
    .then(orders => {

      return res.json(orders)
    
    })
    .catch(err => console.log(err));
};

exports.postDeleteCartItem = (req, res, next) => {
  // console.log("req.body")
  const prodId = req.body.id;
  req.user 
  .getCart()
  .then(cart => {
    return cart.getProducts({ where: { id: prodId } });
  })
  .then(products => {
    const product = products[0];
    return product.cartItem.destroy();
  })
  // .then(result => {
  //   res.redirect('/cart');
  // })
  .catch(err => console.log(err));
}