'use strict';
const { hashPassword } = require ('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'name is null'
        },
        notEmpty: {
           msg: 'name cannot be empty'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'name is null'
        },
        isEmail: {
          msg: 'email format is wrong'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'name is null'
        },
        len: {
          args: [5, 12],
          msg: 'password must between 5 to 12 characters'
        }
      }
    },
    role: {
      type:DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: 'name is null'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, option) => {
        user.password = hashPassword(user.password)
      }
    }, sequelize
  });
  User.associate = function(models) {
    User.belongsToMany(models.Product,{through:'Item'})
    User.hasMany(models.Item)
  };
  return User;
};