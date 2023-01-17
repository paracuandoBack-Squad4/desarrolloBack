'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {

      await queryInterface.createTable('Profiles', {
        id: {
          allowNull: false,
          primaryKey: true,
          defaultValue: Sequelize.UUIDV4,
          type: Sequelize.UUID
        },
        user_id: {
          type: Sequelize.UUID,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        role_id: {
          type: Sequelize.BIGINT,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'Roles',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
          defaultValue: 1
        },
        image_url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        code_phone: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        phone: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true
        },
        country_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          foreignKey: true,
          references: {
            model: 'Countries',
            key: 'id'
          },
          defaultValue: 1,
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
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
      await queryInterface.dropTable('Profiles', { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}