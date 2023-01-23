const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize=require('./util/database');
const errorController = require('./controllers/error');
const product=require('./models/product');
const cart=require('./models/cart');
const cartItem=require('./models/cart-item');
const user=require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
// const sequelize=require('sequelize');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const { application } = require('express');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    user.findByPk(1)
    .then(User=>{
        req.user=User;
        next();
    })
    .catch(err=>console.log(err));
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

product.belongsTo(user,{constraints:true,onDelete:'CASCADE'});
user.hasMany(product);

user.hasOne(cart);
cart.belongsTo(user);
cart.belongsToMany(product,{through:cartItem});
product.belongsToMany(cart,{through:cartItem});

sequelize.sync()
// sequelize.sync({force:true})
.then(result=>{
    return user.findByPk(1);
})
.then(User=>{
    if(!User){
        return user.create({UserName:'test@g',email:'test',password:'password'});
    }
    return User;
})
.then(user=>{
    user.createCart();
})
.then(()=>{
    app.listen(8001);
})
.catch(err=>console.log(err));