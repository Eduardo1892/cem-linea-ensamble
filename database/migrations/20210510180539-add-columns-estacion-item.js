'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('estaciones_items', 'cantidad_registra_paquete', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      after: 'cantidad',
    })

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('estaciones_items', 'cantidad_registra_paquete')

  }
};