const { json } = require('body-parser');
const fs=require('fs');
const { parse } = require('path');
const path=require('path');
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports=class Cart{
    // fetch the previous cart
    static addProduct(id,productPrice){
        fs.readFile(p,(err,fileContent)=>{
            let cart={products:[],totalPrice:0};

            if(!err){
                cart=JSON.parse(fileContent);
            }
            const existingProduct=cart.products.find(prod=>prod.id===id);
            let updatedproduct;
            if(existingProduct){
                updatedproduct={...existingProduct}
                updatedproduct.qty=updatedproduct.qty+1;
            }else{
                updatedproduct={id:id,qty=1};
                cart.product=[...cart.products,updatedproduct];
            }
            cart.totalPrice=cart.totalPrice+cart.productPrice;
            cart.product=[...cart.products];
        })
    }
    // analyse the cart=> analize the existing product
    // add new product

}