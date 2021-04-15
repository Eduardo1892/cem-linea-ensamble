'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('maquinas', {
      codigo: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING(128),
      },
      codigo_estacion: {
        type: Sequelize.STRING(128),
        allowNull: false,
        references: {
            model: 'estaciones',
            key: 'codigo'
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('maquinas');
  }
};