'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    let codigoBarras = [
      { codigo_barra: "CB-10", codigo_item: "IT-1" },
      { codigo_barra: "CB-11", codigo_item: "IT-1" },
      { codigo_barra: "CB-12", codigo_item: "IT-1" },

      { codigo_barra: "CB-20", codigo_item: "IT-2" },
      { codigo_barra: "CB-21", codigo_item: "IT-2" },
      { codigo_barra: "CB-22", codigo_item: "IT-2" },

      { codigo_barra: "CB-30", codigo_item: "IT-3" },
      { codigo_barra: "CB-31", codigo_item: "IT-3" },
      { codigo_barra: "CB-32", codigo_item: "IT-3" },

      { codigo_barra: "CB-40", codigo_item: "IT-4" },
      { codigo_barra: "CB-41", codigo_item: "IT-4" },
      { codigo_barra: "CB-42", codigo_item: "IT-4" },

      { codigo_barra: "CB-50", codigo_item: "IT-5" },
      { codigo_barra: "CB-51", codigo_item: "IT-5" },
      { codigo_barra: "CB-52", codigo_item: "IT-5" },

      { codigo_barra: "CB-60", codigo_item: "IT-6" },
      { codigo_barra: "CB-61", codigo_item: "IT-6" },
      { codigo_barra: "CB-62", codigo_item: "IT-6" },
      

    ]
    await queryInterface.bulkInsert('codigo_barras', codigoBarras, {});


  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('codigo_barras', null, {});

  }
};
