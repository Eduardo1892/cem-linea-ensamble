'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('lectores', {
      codigo: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
      },
      inactivo: {
        type: Sequelize.BOOLEAN,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('lectores');
  }
};