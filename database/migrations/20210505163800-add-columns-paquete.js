'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.addColumn('paquetes', 'codigo_qa', {
      type: Sequelize.DataTypes.STRING(128),
      allowNull: true,
      after: 'codigo_lector',
      references: {
        model: 'codigos_qa',
        key: 'codigo',
      }
    })

    await queryInterface.addColumn('paquetes', 'observacion', {
      type: Sequelize.DataTypes.STRING(128),
      allowNull: true,
      after: 'codigo_qa',
    })

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('paquetes', 'codigo_qa')
    await queryInterface.removeColumn('paquetes', 'observacion')

  }
};