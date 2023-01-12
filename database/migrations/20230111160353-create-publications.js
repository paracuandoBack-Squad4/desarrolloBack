'use strict'
const Profiles = require('../models/profiles')
const Publications_type = require('../models/publications_type')
const City = require('../models/city')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('Publications', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.UUID
        },
        profile_id: {
          type: Sequelize.UUID,
          references: {
            model: Profiles,
            key: 'id'
          }
        },
        publication_type_id: {
          type: Sequelize.INTEGER,
          references: {
            model: Publications_type,
            key: 'id'
          }
        },
        title: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        content: {
          type: Sequelize.STRING
        },
        picture: {
          type: Sequelize.STRING
        },
        city_id: {
          type: Sequelize.STRING,
          references: {
            model: City,
            key: 'id'
          }
        },
        image_url: {
          type: Sequelize.STRING
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
      await queryInterface.dropTable('Publications')
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}