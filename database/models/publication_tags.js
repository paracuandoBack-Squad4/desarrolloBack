'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publication_Tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Publication_Tags.init({
    tag_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    publication_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Publication_Tags',
    tableName: 'Publication_Tags',
    underscored: true,
    timestamps: true,
    scopes: {
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Publication_Tags;
};