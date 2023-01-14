'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      City.belongsTo(models.Countries, { as: 'Countries', foreignKey: 'country_id' })
      City.hasMany(models.Publications, { as: 'Publications', foreignKey: 'city_id' })
    }
  }
  City.init({
    country_id: DataTypes.BIGINT,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'city',
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
  return City;
};