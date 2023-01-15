const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows,fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findProduct(prodId)
  .then(([res1,res2])=>{
    res.render('shop/product-detail', {
      product: res1[0],
      pageTitle: res1[0].title,
      path: '/products'
    })
    console.log(res1);
  })
  .catch(err=>console.log(err));

}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(([rows,fieldData])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
