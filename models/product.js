const Sequileze = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type: Sequileze.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: Sequileze.STRING,
    price: {
        type: Sequileze.DOUBLE,
        allowNull: false
    },
    imageUrl: {
        type: Sequileze.STRING,
        allowNull: false,
    },
    description: {
        type: Sequileze.STRING,
        allowNull: false,
    }

});
module.exports = Product;