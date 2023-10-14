
const Sequelize=require('sequelize');
const sequelize=require('../database/connect');

const hrModel=sequelize.define('hrData',{
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
    companyName:{
        type:Sequelize.STRING,
        allowNull:true
    },
    companyAddress:{
        type:Sequelize.STRING,
        allowNull:true
    },
    companyCity:{
        type:Sequelize.STRING,
        allowNull:true
    },
    companyPincode:{
        type:Sequelize.STRING,
        allowNull:true
    },
    companyState:{
        type:Sequelize.STRING,
        allowNull:true
    },
    companyCountry:{
        type:Sequelize.STRING,
        allowNull:true
    },
    companyGSTNumber:{
        type:Sequelize.STRING,
        allowNull:true
    },
    companyLinkedIn:{
        type:Sequelize.STRING,
        allowNull:true
    },
    companyAdditionalLink:{
        type:Sequelize.STRING,
        allowNull:true
    }, 
    verifiedStatus:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    },
    password:{
        type:Sequelize.JSON
    }
});

module.exports=hrModel;