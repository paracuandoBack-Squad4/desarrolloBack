'use strict'
const { Op } = require('sequelize')
const { hash } = require('../../utils/Crypto')
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('Publications_types', [
        {
          id: 1,
          name: 'Evento',
          description: 'Eventos organizados',
          createdAt: new Date(),
          updatedAt: new Date()

        },
        {
          id: 2,
          name: 'Concierto',
          description: 'Conciertos Organizados',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          id: 3,
          name: 'Torneo',
          description: 'Torneos organizados',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ], { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkDelete('roles', {
        name: {
          [Op.or]: ['admin', 'public',]
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
