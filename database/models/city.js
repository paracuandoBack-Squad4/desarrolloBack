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
      City.belongsTo(models.State, { as: 'State', foreignKey: 'state_id' })
      City.hasMany(models.Publications, { as: 'Publications', foreignKey: 'city_id' })
    }
  }
  City.init({
    state_id: DataTypes.BIGINT,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'City',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'state_id', 'name']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return City;
};