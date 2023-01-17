const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    edit:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  Product.create({
    title:title,
    imageUrl:imageUrl,
    price:price,
    description:description
  })
  .then(()=>{
    res.redirect('/');
  })
  .catch(err=>console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
    // console.log(products);
  })
  .catch(err=>console.log(err));
};
exports.deleteProduct=(req,res,next)=>{
  // console.log(req.body.Id);
  Product.destroy({
    where:{
      id:req.body.Id
    }
  })
  .then(()=>{
    res.redirect('/admin/products');
  })
  .catch(err=>console.log(err));
}
exports.EditProduct=(req,res,next)=>{
  // console.log(req.params.productId);
  Product.findAll({
    where:{
      id:req.params.productId
    }
  })
  .then(result=>{
    res.render('admin/add-product',{
      product:result[0],
      pageTitle: 'Edit Product',
      path: '/admin/add-product',
      edit:true
    })
  })
  .then(()=>{
    Product.destroy({
      where:{
        id: req.params.productId
      }
    })
  })
  .catch(err=>console.log(err));
}