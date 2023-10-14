const Sequelize=require('sequelize');
const sequelize=require('../database/connect');

const subHrModel=sequelize.define('subHrData',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    userName:{
        type:Sequelize.STRING
    },
    emailId:{
        type:Sequelize.STRING,
        allowNull:true
    },
    contactNumber:{
        type:Sequelize.INTEGER,
        allowNull:true
    },
    hrId:{
        type:Sequelize.INTEGER
    },
    role:{
        type:Sequelize.INTEGER
    },
    password:{
        type:Sequelize.JSON
    }
});

module.exports=subHrModel;