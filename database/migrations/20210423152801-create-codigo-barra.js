'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('codigo_barras', {
      codigo_barra: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
      },
      codigo_item: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'items',
            key: 'codigo'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('codigo_barras');
  }
};