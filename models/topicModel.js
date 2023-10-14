const Sequelize=require('sequelize');
const sequelize=require('../database/connect');

const topicModel=sequelize.define('interviewtopics',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    categoryid:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    topic:{
        type:Sequelize.STRING
    }
},
{
    timestamps: false // disable createdAt and updatedAt
  });

module.exports=topicModel;