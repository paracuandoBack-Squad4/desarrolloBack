const uuid = require('uuid')
const profiles = require('../database/models/profiles')
const Profiles = require('../database/models/profiles')
// const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')

class ProfilesServices {

  constructor() {

  }

  createProfile = async (obj) => {
    const transaction = await Profiles().sequelize.transaction()
    try {
      let newProfile = await profiles.create({
        id: uuid.v4(),
        user_id: obj.user_id,
        role_id: obj.role_id,
        image_url: obj.image_url,
        code_phone: obj.code_phone,
        phone: obj.phone,
        country_id: obj.country_id
      }, { transaction })

      await transaction.commit()
      return newProfile
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async updateProfile(id, obj) {
    const transaction = await Profiles().sequelize.transaction()
    try {
      let profile = await Profiles().findByPk(id)

      if (!profile) throw new CustomError('Not found profile', 404, 'Not Found')

      let updatedProfile = await profile.update({
        image_url: obj.image_url,
        code_phone: obj.code_phone,
        phone: obj.phone,
        country_id: obj.country_id
      }, { transaction })

      await transaction.commit()

      return updatedProfile

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }


}

module.exports = ProfilesServices