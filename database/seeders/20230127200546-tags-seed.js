'use strict'
const { Op } = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('Tags', [
        {
          id: 1,
          name: 'Concert',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 2,
          name: 'Festival',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          id: 3,
          name: 'Theater',
          created_at: new Date(),
          updated_at: new Date()
        },
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
      await queryInterface.bulkDelete('Tags', {
        name: {
          [Op.or]: ['Concert', 'Festival', 'Theater']
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}