const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(result=>{
      res.render('shop/product-list',{
        prods: result,
        pageTitle: 'All Products',
        path: '/products'
      })
      // console.log(result);
    })
    .catch(err => console.log(err));
};
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(req.params);
  Product.findAll({
    where:{
      id:prodId
    }
  })
  .then(result=>{
    res.render('shop/product-detail', {
      product: result[0],
      pageTitle:result[0].title,
      path: '/products'
    })
  })
  .catch(err=>console.log(err));

}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(result=>{
    res.render('shop/index', {
      prods: result,
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
