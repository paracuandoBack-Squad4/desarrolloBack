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
      Votes.belongsTo(models.profiles, { as: 'profiles', foreignKey: 'profile_id' })
      Votes.belongsTo(models.publications, { as: 'publications', foreignKey: 'publication_id' })
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