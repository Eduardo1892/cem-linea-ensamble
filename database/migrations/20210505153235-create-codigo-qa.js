'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('codigos_qa', {
      codigo: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: true,
      },
      descripcion: {
        type: Sequelize.STRING(128),
      }
    });
    
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('codigos_qa');
  }
};