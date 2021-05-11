'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.addColumn('paquetes', 'cantidad_item', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      after: 'observacion',
    })

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('paquetes', 'cantidad_item')

  }
};