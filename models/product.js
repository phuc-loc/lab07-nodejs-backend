const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId

class Product {

  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id
  }

  // save() {
  //   const db = getDb();
  
  //   let dbOp;
  //   if (this._id) {
  //     dbOp = db
  //     .collection('products')
  //     .updateOne({_id: new ObjectId(this._id)}, {$set: this})
  //   } else {
  //     dbOp = db
  //     .collection('products')
  //     .insertOne(this)
  //   }
  //   return dbOp
  //     .then(result => {
  //       // console.log('//model', result)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }
  save() {
    const db = getDb();
    let dbOp;
    console.log('this', this);
    if (this._id){
      dbOp = db
      .collection('products')
      .updateOne({_id: new mongodb.ObjectId(this._id)}, {$set: this});
    } else {
      dbOp = db
      .collection('products')
      .insertOne(this);
    }
    return dbOp
      .then(result => {
        console.log('//result model', result)
      })
      .catch(err => {
        console.log(err);
      })
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        // console.log('//products', products)
        return products
      })
      .catch(err => {
        console.log(err)
      })
  }

}

module.exports = Product;