const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    foreignKey: "cartId"
  },
  quantity: Sequelize.INTEGER
});

module.exports = CartItem;
