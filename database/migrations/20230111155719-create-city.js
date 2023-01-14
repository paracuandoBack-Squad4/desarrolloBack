'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {


      await queryInterface.createTable('City', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        state_id: {
          type: Sequelize.BIGINT,
          references: {
            model: 'States',
            key: 'id'
          }
        },
        name: {
          type: Sequelize.STRING,
          unique: true
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('Cities')
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}