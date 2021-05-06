'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('estaciones', 'es_proceso', {
      type: Sequelize.DataTypes.BOOLEAN,
      after: 'es_inicio',
    })

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('estaciones', 'es_proceso')

  }
};