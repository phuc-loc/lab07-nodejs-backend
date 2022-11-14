const Product = require('../models/product');
const Cart = require('../models/cart');

//xem thử trong file json có DL chưa ???
exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
      Product.fetchAll( products => {

        const cartProducts = [];

        for (product of products) { 

          const cartProductData = cart.products.find(
            prod => prod.id === product.id
          );

          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }

        }
        return res.json(cartProducts) 
      });
    });
  }; 
  

  //ghi vào file json 
  exports.postCart = (req, res, next) => {
    const prodId = req.body.id;
    console.log(prodId);
    Product.findById(prodId, product => {
      Cart.addProduct(prodId, product.price);
    });
  }


