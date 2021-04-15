'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('estaciones_origen_vs_estaciones_destino', {
      codigo_estacion_origen: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'estaciones',
            key: 'codigo',
        }
      },
      codigo_estacion_destino: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'estaciones',
          key: 'codigo',
        }
      }
      
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('estaciones_origen_vs_estaciones_destino');
  }
};