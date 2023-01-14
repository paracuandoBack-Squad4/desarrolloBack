'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Countries extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Countries.hasMany(models.Profiles, { as: 'Profiles', foreignKey: 'country_id' })
      Countries.hasMany(models.State, { as: 'State', foreignKey: 'country_id' })
    }
  }
  Countries.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Countries',
    tableName: 'countries',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['name']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Countries;
};