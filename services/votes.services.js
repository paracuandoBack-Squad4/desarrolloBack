const Votes = require('../database/models/votes')
const { CustomError } = require('../utils/custom-error')



class votesServices {

  constructor() {

  }
  async createVote(obj) {
    const transaction = await Votes().sequelize.transaction()
    try {
      let newPublication = await Votes().create({
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

  async findAllVotes(id) {
    let votes = await Votes().findAll({
      where: {
        publication_id: id
      }
    })
    return votes
  }

  async removeVote(id) {
    const transaction = await Votes().sequelize.transaction()
    try {
      let vote = await Votes().findByPk(id)

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