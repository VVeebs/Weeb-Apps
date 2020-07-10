'use strict';
const { Model } = require('sequelize');
const { encrypt } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.FavManga, { foreignKey: 'user_id' })
    }
  };
  User.init({
    name: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notNull: true,
        notEmpty: true
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user) => {
        user.password = encrypt(user.password);
      },
    },
    modelName: 'User',
  });
  return User;
};