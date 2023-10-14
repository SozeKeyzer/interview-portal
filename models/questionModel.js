const Sequelize = require('sequelize');
const sequelize = require('../database/connect');

const questionModel = sequelize.define('questionTable', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryId: {
        type: Sequelize.STRING,
    },
    topicId: {
        type: Sequelize.STRING,
    },
    question: {
        type: Sequelize.STRING,
    }
}
);

module.exports = questionModel;