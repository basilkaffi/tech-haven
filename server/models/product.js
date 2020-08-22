'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'name is null'
        },
        notEmpty: {
           msg: 'product name cannot be empty'
        }
      }
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'image url is null'
        },
        notEmpty: {
           msg: 'image cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'price is null'
        },
        min: {
          args: [0], 
          msg: 'price cannot be minus'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'stock is null'
        },
        min: {
          args: [0], 
          msg: 'stock cannot be minus'
        }
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'category url is null'
        },
        notEmpty: {
           msg: 'category cannot be empty'
        }
      }
    }
  }, {});
  Product.associate = function(models) {
    Product.belongsToMany(models.User,{through:'Item'})
    Product.hasMany(models.Item)
  };
  return Product;
};