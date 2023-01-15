const { v4: uuid4 } = require('uuid');
const Profiles = require('../database/models/profiles')
const { CustomError } = require('../utils/custom-error')
const models = require('../database/models')

class ProfilesServices {

  constructor() {

  }

  async updateProfile(id, obj) {
    const transaction = await Profiles.sequelize.transaction()
    try {
      let profile = await models.Profiles.findByPk(id)

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