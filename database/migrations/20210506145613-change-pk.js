'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

   
    await queryInterface.addColumn('paquetes', 'numero', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      after: 'codigo',
    })
    
    await queryInterface.sequelize.query('ALTER TABLE paquetes DROP PRIMARY KEY, ADD PRIMARY KEY(codigo, numero)')
    
    await queryInterface.changeColumn('paquetes', 'codigo_item', {
      type: Sequelize.DataTypes.STRING(128),
      allowNull: true,
    })

    await queryInterface.changeColumn('paquetes', 'codigo_barra', {
      type: Sequelize.DataTypes.STRING(128),
      allowNull: true,
    })
    
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.changeColumn('paquetes', 'codigo_item', {
      type: Sequelize.DataTypes.STRING(128),
      allowNull: false,
    })

    await queryInterface.changeColumn('paquetes', 'codigo_barra', {
      type: Sequelize.DataTypes.STRING(128),
      allowNull: false,
    })

    await queryInterface.sequelize.query('ALTER TABLE paquetes DROP PRIMARY KEY, ADD PRIMARY KEY(codigo, codigo_item, codigo_estacion, codigo_barra)')
    
    await queryInterface.removeColumn('paquetes', 'numero')

 
  }
};
