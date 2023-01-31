'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recovery_Passwords extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recovery_Passwords.belongsTo(models.Users, {as: 'user', foreignKey: 'user_id'})
    }
  }
  Recovery_Passwords.init({
    user_id: {
      type: DataTypes.UUID,
      foreignKey: true
    },
    used: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Recovery_Passwords',
    tableName: 'Recovery_Passwords',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'user_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Recovery_Passwords;
};