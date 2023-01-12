const uuid4 = require('uuid')
const Profiles = require('../database/models/profiles');
const {Op} = require('sequelize');
const { CustomError } = require('../utils/custom-error');

class ProfilesServices {

  constructor(){

  }

  async findAndCount(query) {
    const options = {
      where: {},
    }

    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { name } = query;
    if (name) {
      options.where.name = { [Op.iLike]: `%${name}%` };
    }

    //Necesario para el findAndCountAll de Sequelize
    options.distinct = true

    const profiles = await Profiles().findAndCountAll(options);
    return profiles;
  }

  async createProfile(obj) {
    const transaction = await Profiles().sequelize.transaction();
    try {
      let newProfile = await Profile().create({
        id: uuid4(), 
        image_url: obj.image_url,                
        code_phone: obj.code_phone,
        phone: obj.phone,
        country_id: obj.country_id
      }, { transaction });

      await transaction.commit();
      return newProfile
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  }

  async getProfileOr404(id) {
    let profile = await Profiles().findByPk(id);

    if (!profile) throw new CustomError('Not found Profile', 404, 'Not Found');

    return profile
  }

  async getProfile(id) {
    let profile = await Profiles().findByPk(id, { raw: true })
    return profile
  }

  async updateProfile(id, obj) {
    const transaction = await Profiles().sequelize.transaction();
    try {
      let profile = await Profiles().findByPk(id);

      if (!profile) throw new CustomError('Not found profile', 404, 'Not Found')

      let updatedProfile = await profile.update({
        image_url: obj.image_url,
        code_phone: obj.code_phone,
        phone: obj.phone,
        country_id: obj.country_id
      }, { transaction })

      await transaction.commit();

      return updatedProfile

    } catch (error) {
      await transaction.rollback();
      throw error
    }
  }

  async removeProfile(id) {
    const transaction = await Profiles().sequelize.transaction();
    try {
      let profile = await Profiles().findByPk(id)

      if (!profile) throw new CustomError('Not found profile', 404, 'Not Found')

      await profile.destroy({ transaction })

      await transaction.commit();

      return profile
    } catch (error) {
      await transaction.rollback();
      throw error
    }
  }

}

module.exports = ProfilesServices