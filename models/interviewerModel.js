const Sequelize = require('sequelize');

const sequelize = require('../database/connect');

const interviewerModel = sequelize.define('interviewerData',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: { 
        type: Sequelize.STRING,
        allowNull: true  
    },
    contactNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    currentEmployer: {
        type: Sequelize.STRING,
        allowNull: true   
    },
    experience: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    resume:{
        type: Sequelize.STRING,
        allowNull: true
    },
    linkedInProfile:{
        type: Sequelize.STRING,
        allowNull: true
    },
    githubProfile:{
        type: Sequelize.STRING,
        allowNull: true
    },
    otherLinks:{
        type: Sequelize.STRING,
        allowNull: true
    },
    technologyStack:{
        type: Sequelize.STRING,
        allowNull: true
    },
    preferredInterviewRole1:{
        type: Sequelize.STRING,
        allowNull: true
    },
    preferredInterviewRole2:{
        type: Sequelize.STRING,
        allowNull: true
    },
    preferredInterviewRole3:{
        type: Sequelize.STRING,
        allowNull: true
    },
    password:{
        type: Sequelize.JSON,
    },
    verifiedStatus:{
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

module.exports = interviewerModel; 