'use strict'

const { validate } = require('uuid')
const Countries = require('../models/countries')
const User = require('../models/users')
const Roles = require('../models/roles')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {

      await queryInterface.createTable('Profiles', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.UUID
        },
        user_id: {
          type: Sequelize.BIGINT,
          references: {
            model: User,
            key: 'id'
          }
        },
        role_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Roles,
            key: 'id'
          }, 
          defaultValue: 'user'
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
          references: {
            model: Countries,
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