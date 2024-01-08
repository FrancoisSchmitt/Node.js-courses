const Sequelize = require('sequelize');

const sequileze = require('../util/database');

const User = sequileze.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
});
module.exports = User;