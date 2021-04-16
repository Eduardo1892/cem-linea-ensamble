'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('estaciones_items', {
      codigo_estacion: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'estaciones',
            key: 'codigo'
        }
      },
      codigo_item: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'items',
            key: 'codigo'
        }
      },
      cantidad: {
        type: Sequelize.INTEGER,
        defaultValue: 1,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('estaciones_items');
  }
};