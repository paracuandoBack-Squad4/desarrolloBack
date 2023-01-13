'use strict'
const Country = require('../models/countries')
const User = require('../models/users')
const Role = require('../models/roles')


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
          type: Sequelize.BIGINT,
          foreignKey: true,
          references: {
            model: User,
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        role_id: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          references: {
            model: Role,
            key: 'id'
          },
          defaultValue: 'user',
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'

        },
        image_url: {
          type: Sequelize.STRING
        },
        code_phone: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        phone: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true
        },
        country_id: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          references: {
            model: Country,
            key: 'id'
          },
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
      await queryInterface.dropTable('Profiles')
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}