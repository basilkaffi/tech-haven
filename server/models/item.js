'use strict';
module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    Order: DataTypes.INTEGER
  }, {});
  Item.associate = function(models) {
    Item.belongsTo(models.User)
    Item.belongsTo(models.Product)
  };
  return Item;
};