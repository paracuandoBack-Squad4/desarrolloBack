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
      Votes.belongsTo(models.Profiles, { as: 'profiles', foreignKey: 'profile_id' })
      Votes.belongsTo(models.Publications, { as: 'publications', foreignKey: 'publication_id' })
    }
  }
  Votes.init({
    publication_id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    profile_id: {
      type: DataTypes.UUID,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'Votes',
    tableName: 'Votes',
    underscored: true,
    timestamps: true,

    scopes: {
      public_view: {
        attributes: ['publication_id', 'profile_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Votes;
};