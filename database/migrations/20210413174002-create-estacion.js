'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('estaciones', {
      codigo: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING(128),
      },
      es_inicio: {
        type: Sequelize.BOOLEAN
      },
      es_termino: {
        type: Sequelize.BOOLEAN
      },
      es_qa: {
        type: Sequelize.BOOLEAN
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('estaciones');
  }
};