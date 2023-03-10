const sequelize=require('../util/database');
const Sequelize= require('sequelize');

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    UserName:{
        type:Sequelize.STRING,
        allowNull: false,
        unique:true,
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false,
    },
});

module.exports=User;