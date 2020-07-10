'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavManga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FavManga.belongsTo(models.User, { foreignKey: 'user_id' })
      FavManga.belongsTo(models.Manga, { foreignKey: 'manga_id' })
    }
  };
  FavManga.init({
    user_id: DataTypes.INTEGER,
    manga_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavManga',
  });
  return FavManga;
};