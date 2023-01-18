'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('Votes', {
        id: {
          type: Sequelize.UUID,
          allowNull: true
        },
        publication_id: {
          type: Sequelize.UUID,
          foreignKey: true,
          primaryKey: true,
          references: {
            model: 'Publications',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          allowNull: false,
        },
        profile_id: {
          type: Sequelize.UUID,
          foreignKey: true,
          primaryKey: true,
          references: {
            model: 'Profiles',
            key: 'id'
          },
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE',
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at'
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at'
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
      await queryInterface.dropTable('Votes', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}