'use strict'
const { Op } = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('Publications_type', [
        {
          id: 1,
          name: 'Evento',
          description: 'Organizacion de eventos',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          name: 'Concierto',
          description: 'Organizacion de conciertos',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          name: 'Torneo',
          description: 'Organizacion de torneos',
          created_at: new Date(),
          updated_at: new Date()
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
      await queryInterface.bulkDelete('Publications_type', {
        name: {
          [Op.or]: ['Evento', 'Concierto', 'Torneo']
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}