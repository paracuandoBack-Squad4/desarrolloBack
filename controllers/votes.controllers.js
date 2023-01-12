const VotesServices = require('../services/votes.services')

const votesServices = new VotesServices()

const addVote = async (request, response, next) => {
  try {
    let { publication_id, profile_id } = request.params
    let vote = await votesServices.createVote({ profile_id, publication_id })
    return response.status(201).json({ results: vote })
  } catch (error) {
    next(error)
  }
}

const getVotes = async (request, response, next) => {
  try {
    let votes = await votesServices.findAllVotes()
    return response.status(200).json({ results: votes })
  } catch (error) {
    next(error)
  }
}

const removeVote = async (request, response, next) => {
  try {
    let { publication_id } = request.params
    let vote = await votesServices.removeVote(publication_id)
    return response.json({ results: vote, message: 'removed' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addVote,
  getVotes,
  removeVote
}