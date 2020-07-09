'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Manga.hasMany(models.FavManga, { foreignKey: 'manga_id' })
    }
  };
  Manga.init({
    image: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    volume: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Manga',
  });
  return Manga;
};