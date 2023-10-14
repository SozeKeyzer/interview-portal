const Sequelize=require('sequelize');
const sequelize=require('../database/connect');

const freeSlotModel=sequelize.define('freeSlotData',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    interviewerId:{
        type:Sequelize.STRING
    },
    interviewerName:{
        type:Sequelize.STRING,
        allowNull:true
    },
    date:{
        type:Sequelize.DATEONLY,
        allowNull:true
    },
    time:{
        type:Sequelize.TIME,
        allowNull:true
    },
    scheduled:{
        type:Sequelize.STRING
    }
});

module.exports=freeSlotModel;