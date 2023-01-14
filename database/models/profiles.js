'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Profiles.belongsTo(models.roles, { as: 'Roles', foreignKey: 'role_id' })
      Profiles.belongsTo(models.users, { as: 'Users', foreignKey: 'user_id' })
      Profiles.belongsTo(models.countries, { as: 'Countries', foreignKey: 'country_id' })
      Profiles.hasMany(models.publications, { as: 'Publications', foreignKey: 'profile_id' })
      Profiles.hasMany(models.votes, { as: 'Votes', foreignKey: 'profile_id' })
    }
  }
  Profiles.init({
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    code_phone: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    country_id: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Profiles',
    tableName: 'profiles',
    underscored: true,
    timestamps: true,
    scopes: {
      public_view: {
        attributes: ['id', 'country_id', 'user_id']
      },
      no_timestamps: {
        attributes: { exclude: ['created_at', 'updated_at'] }
      },
    },
  });
  return Profiles;
};