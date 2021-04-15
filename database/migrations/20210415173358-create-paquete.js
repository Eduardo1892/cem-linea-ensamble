'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('paquetes', {
      codigo: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
      },
      codigo_item: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'items',
            key: 'codigo',
        }
      },
      codigo_estacion: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'estaciones',
          key: 'codigo',
        }
      },
      codigo_maquina: {
        type: Sequelize.STRING(128),
        allowNull: false,
        references: {
          model: 'maquinas',
          key: 'codigo',
        }
      },
      codigo_usuario: {
        type: Sequelize.STRING(128),
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'codigo',
        }
      },
      codigo_lector: {
        type: Sequelize.STRING(128),
        allowNull: false,
        references: {
          model: 'lectores',
          key: 'codigo',
        }
      },
      codigo_barra: {
        type: Sequelize.STRING(128),
      },
      fecha_sys: {
        type: Sequelize.DATE,
      },
      hora_sys: {
        type: Sequelize.DATE,
      },
      finalizado: {
        type: Sequelize.BOOLEAN
      }

    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('paquetes');
  }
};