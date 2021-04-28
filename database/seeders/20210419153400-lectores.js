'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    let lectores = [
      { codigo: "LECT-A", inactivo: false },
      { codigo: "LECT-B", inactivo: false },
    ]

    await queryInterface.bulkInsert('lectores', lectores, {});
    
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('lectores', null, {});
  }
};
