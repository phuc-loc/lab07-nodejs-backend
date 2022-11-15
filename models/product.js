const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const db = require('../util/database')

const p = path.join(path.dirname(require.main.filename), 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent)); 
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageurl, description, price) {
    this.id = id;
    this.title = title;
    this.imageurl = imageurl;
    this.description = description;
    this.price = price;
  }
  save() {
    return db.execute(
      'INSERT INTO products2 (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
      [this.title, this.price, this.description, this.imageurl]
      )
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products2');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products2 WHERE prodcuts2.id =?',
    [id])
  }

  static deleteById(id) {
  }

}