'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Publication_Tags', {
      tag_id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      publication_id: {
        primaryKey: true,
        allowNull: false, 
        type: Sequelize.UUID,
        references:{
          model: 'Publications',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('Publication_Tags', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}