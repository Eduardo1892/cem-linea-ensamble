'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    let estaciones = [
      { codigo: "EST-A", descripcion: "ESTACION A", es_inicio: true, es_proceso: false, es_termino: false, es_qa: false },
      { codigo: "EST-B", descripcion: "ESTACION B", es_inicio: false, es_proceso: true, es_termino: false, es_qa: false },  
      { codigo: "EST-C", descripcion: "ESTACION C", es_inicio: false, es_proceso: false, es_termino: true, es_qa: false }, 
      { codigo: "EST-QA", descripcion: "ESTACION QA", es_inicio: false, es_proceso: false, es_termino: false, es_qa: true },   
    ]

    await queryInterface.bulkInsert('estaciones', estaciones, {});
    
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.bulkDelete('estaciones', null, {});
    
  }
};
