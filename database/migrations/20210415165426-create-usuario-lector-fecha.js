'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('usuarios_lectores_fecha', {
      codigo_usuario: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'codigo',
        }
      },
      codigo_lector: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'lectores',
          key: 'codigo',
        }
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('usuarios_lectores_fecha');
  }
};