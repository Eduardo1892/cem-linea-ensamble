'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let usuarios = [
      { codigo: "18999799K", nombre:"Eduardo Alvarez", password:"$2b$10$rV5rxTROcJP6oQSTCww6kexqOaZDqKQXaoApWZgM1uf5Pj/ztMlMK", inactivo: false },
      { codigo: "162323695", nombre:"Alan Alvarez", password:"$2b$10$rV5rxTROcJP6oQSTCww6kexqOaZDqKQXaoApWZgM1uf5Pj/ztMlMK", inactivo: false }, 
    ]
    
    await queryInterface.bulkInsert('usuarios', usuarios, {});
  
  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('usuarios', null, {});
    
  }
};
