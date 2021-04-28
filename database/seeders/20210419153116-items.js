'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let items = [
      { codigo: "IT-1", descripcion: "ITEM 1" },
      { codigo: "IT-2", descripcion: "ITEM 2" },
      { codigo: "IT-3", descripcion: "ITEM 3" },
      { codigo: "IT-4", descripcion: "ITEM 4" },
      { codigo: "IT-5", descripcion: "ITEM 5" },
      { codigo: "IT-6", descripcion: "ITEM 6" },
    ]
    await queryInterface.bulkInsert('items', items, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('items', null, {});
    
  }
};
