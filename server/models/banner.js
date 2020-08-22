'use strict';
module.exports = (sequelize, DataTypes) => {
  const Banner = sequelize.define('Banner', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'name is null'
        },
        notEmpty: {
           msg: 'banner name cannot be empty'
        }
      }
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'image url is null'
        },
        notEmpty: {
           msg: 'image url cannot be empty'
        }
      }
    }
  }, {});
  Banner.associate = function(models) {
    // associations can be defined here
  };
  return Banner;
};