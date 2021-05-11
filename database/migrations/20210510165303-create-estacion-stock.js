'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('estaciones_stock', {
      codigo_barra: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
      },
      codigo_item: {
        type: Sequelize.STRING(128),
        allowNull: false,
        references: {
          model: 'items',
          key: 'codigo',
        }
      },
      codigo_estacion: {
        type: Sequelize.STRING(128),
        allowNull: false,
        references: {
          model: 'estaciones',
          key: 'codigo',
        }
      },
      cantidad_total: {
        type: Sequelize.INTEGER,
        allowNull:false
      },
      cantidad_utilizada: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cantidad_disponible: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('estaciones_stock');
  }
};