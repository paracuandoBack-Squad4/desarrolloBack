'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Votes.belongsTo(models.Profiles, { as: 'profiles', foreignKey: 'profile_id' })
      Votes.belongsToMany(models.Publications, { as: 'publications', through: models.Publications, foreignKey: 'publication_id' })
    }
  }
  Votes.init({
    publication_id: DataTypes.UUID,
    profile_id: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'Votes',
  });
  return Votes;
};