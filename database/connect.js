const Sequelize = require('sequelize');

const sequelize = new Sequelize('nodetut','root','password',{
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize; 