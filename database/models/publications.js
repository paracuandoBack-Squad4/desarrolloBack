'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Publications extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Publications.belongsTo(models.city, { as: 'city', foreignKey: 'city_id' })
      Publications.belongsTo(models.profiles, { as: 'profiles', foreignKey: 'profile_id' })
      Publications.belongsTo(models.publications_types, { as: 'publication_types', foreignKey: 'publication_type_id' })
      Publications.hasMany(models.votes, { as: 'votes', foreignKey: 'publication_id' })
    }
  }
  Publications.init({
    profile_id: DataTypes.UUID,
    publication_type_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    content: DataTypes.STRING,
    picture: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Publications',
  });
  return Publications;
};