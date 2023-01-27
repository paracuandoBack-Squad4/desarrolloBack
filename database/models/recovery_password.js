'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recovery_Password extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Recovery_Password.belongsTo(models.Users, {as: 'users', foreignKey: 'user_id'})
    }
  }
  Recovery_Password.init({
    user_id: DataTypes.UUID,
    used: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Recovery_Password',
  });
  return Recovery_Password;
};