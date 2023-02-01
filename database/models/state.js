'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      State.hasMany(models.City, { as: 'City', foreignKey: 'state_id' })
      State.belongsTo(models.Countries, { as: 'Countries', foreignKey: 'country_id' })
    }
  }
  State.init({
    country_id: DataTypes.INTEGER,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'State',
    tableName: 'State',
    underscored: true,
    timestamps: true,

    scopes: {
      public_view: {
        attributes: ['id', 'name', 'country_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return State;
};