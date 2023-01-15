
const db=require('../util/database');

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO Products (title,totalPrice,imageurl,Description) VALUES (?,?,?,?)',
    [this.title,this.price,this.imageUrl,this.description]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM Products')
  }
  static findProduct(id) {
    return db.execute('SELECT * FROM Products WHERE id=?',[id]);
  }
  static deleteProduct(id){
    return db.execute('DELETE FROM Products WHERE Id=?',[id]);
  }
};
