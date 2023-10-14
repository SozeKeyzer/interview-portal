const Sequelize = require('sequelize');
const sequelize = require('../database/connect');

const categotyModel = sequelize.define('interviewcategories', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category: {
        type: Sequelize.STRING,
    }
}, {
    timestamps: false // disable createdAt and updatedAt
});

module.exports = categotyModel;