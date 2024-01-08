const Sequileze = require('sequelize');

const sequileze = new Sequileze('node-complet', 'root', 'Skews2728', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequileze;