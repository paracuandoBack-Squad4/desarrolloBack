'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Publications_type.hasMany(models.Publications, { as: 'Publications', foreignKey: 'publication_type_id' })
    }
  }
  Publications_type.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publications_type',
    tableName: 'Publications_type',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'name', 'description']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Publications_type;
};