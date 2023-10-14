const Sequelize=require('sequelize');
const sequelize=require('../database/connect');

const selectedProduct=sequelize.define('companyinterviewcategory',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    companyid:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    categoryid:{
        type:Sequelize.INTEGER,
        allowNull:false
    }
});

module.exports=selectedProduct;