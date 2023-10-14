const Sequelize=require('sequelize');
const sequelize=require('../database/connect');

const interviewDataModel=sequelize.define('interviewData',{
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
    studentEmail:{
        type:Sequelize.STRING
    },
    studentContact:{
        type:Sequelize.STRING
    },
    studentDob:{
        type:Sequelize.STRING
    },
    position:{
        type:Sequelize.STRING
    },
    roundNumber:{
        type:Sequelize.STRING
    },
    dateTime:{
        type:Sequelize.STRING
    },
    date:{
        type:Sequelize.DATE
    },
    time:{
        type:Sequelize.TIME
    },
    selectCategory:{
        type:Sequelize.STRING
    },
    resumeLink:{
        type:Sequelize.STRING
    },
    meetingLink:{
        type:Sequelize.STRING
    },
    interviewerId:{
        type:Sequelize.STRING
    },
    uniqueId:{
        type:Sequelize.STRING

    },
    companyId:{
        type:Sequelize.STRING
    },
    paymentStatus:{
        type:Sequelize.ENUM,
        values: ['full', 'half', 'none'],
        defaultValue: 'full'
    },
    scheduledTime:{
        type:Sequelize.TIME
    },
    scheduledDay:{
        type:Sequelize.STRING
    }

});

module.exports=interviewDataModel;

