const Sequelize=require('sequelize');
const sequelize=require('../database/connect');

const categoryRoundModel=sequelize.define('companycategoryinterviewround1',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    roundnumber:{
        type:Sequelize.INTEGER,
    },
    categoryid:{
        type:Sequelize.INTEGER,
    },
    topicid:{
        type:Sequelize.INTEGER,
    },
    companyid:{
        type:Sequelize.INTEGER,
    }
});

module.exports=categoryRoundModel;