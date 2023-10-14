const Sequelize=require('sequelize');
const sequelize=require('../database/connect');

const unscheduledModel=sequelize.define('unscheduledInterview',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    studentName:{
        type:Sequelize.STRING
    },
    studentCollege:{
        type:Sequelize.STRING
    },
    studentId:{
        type:Sequelize.STRING
    },
    studentContact:{
        type:Sequelize.STRING
    },
    email:{
        type:Sequelize.STRING
    },
    dob:{
        type:Sequelize.STRING
    },
    position:{
        type:Sequelize.STRING
    },
    round:{
        type:Sequelize.STRING
    },
    category:{
        type:Sequelize.STRING
    },
    resumeLink:{
        type:Sequelize.STRING
    },
    companyId:{
        type:Sequelize.STRING
    }
});

module.exports=unscheduledModel;