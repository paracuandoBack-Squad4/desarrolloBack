const models = require('../database/models')
const { CustomError } = require('../utils/custom-error')



class votesServices {

  constructor() {

  }
  async createVote(obj) {
    const transaction = await models.Votes().sequelize.transaction()
    try {
      let newPublication = await models.Votes().create({
        profile_id: obj.profile_id,
        publication_id: obj.publication_id
      }, { transaction })

      await transaction.commit()
      return newPublication
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async findAllVotes() {
    let votes = await models.Votes().findAll()
    return votes
  }

  async removeVote(id) {
    const transaction = await models.Votes().sequelize.transaction()
    try {
      let vote = await models.Votes().findOne({
        where: {
          publication_id: id
        }
      })

      if (vote) throw new CustomError('Not found publication', 404, 'Not Found')

      await vote.destroy({ transaction })

      await transaction.commit()

      return vote
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }


}

module.exports = votesServices