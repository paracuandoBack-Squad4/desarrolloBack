'use strict'
const { Op } = require('sequelize')
const { hash } = require('../../utils/Crypto')
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.bulkInsert('Users', [
        {
          id: 1,
          first_name: 'luis',
          last_name: 'burga',
          email: 'luisjavier@hotmail.com',
          username: 'luisjavier98',
          password: hash('root'),
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
