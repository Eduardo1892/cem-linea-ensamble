'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let maquinas = [
      { codigo: "MAQ-A", descripcion: "MAQUINA A", codigo_estacion: "EST-A" },
      { codigo: "MAQ-B", descripcion: "MAQUINA B", codigo_estacion: "EST-B" },
    ]
    
    await queryInterface.bulkInsert('maquinas', maquinas, {});
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('maquinas', null, {});
    
  }
};
