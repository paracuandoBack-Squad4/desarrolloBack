'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profiles.belongsTo(models.Roles, { as: 'roles', foreignKey: 'role_id' })
      Profiles.belongsTo(models.Users, { as: 'users', foreignKey: 'user_id' })
      Profiles.belongsTo(models.Countries, { as: 'countries', foreignKey: 'country_id' })
      Profiles.hasMany(models.Publications, { as: 'publications', foreignKey: 'profile_id' })
      Profiles.hasOne(models.Votes, { as: 'votes', foreignKey: 'profile_id' })
    }
  }
  Profiles.init({
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    code_phone: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    country_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profiles',
  });
  return Profiles;
};