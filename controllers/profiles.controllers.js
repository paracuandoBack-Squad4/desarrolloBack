const ProfilesServices = require('../services/profiles.services')

const profileService = new ProfilesServices()

const addProfile = async (request, response, next) => {

  try {
    let { user_id, image_url, code_phone, phone, country_id } = request.body
    let profile = await profileService.createProfile({ user_id, image_url, code_phone, phone, country_id })
    return response.status(201).json({ results: profile })
  } catch (error) {
    next(error)
  }
}

const updateProfile = async (request, response, next) => {
  try {
    let { id } = request.params
    let { image_url, code_phone, phone, country_id } = request.body
    let profile = await profileService.updateProfile(id, { image_url, code_phone, phone, country_id })
    return response.json({ results: profile })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addProfile,
  updateProfile
}