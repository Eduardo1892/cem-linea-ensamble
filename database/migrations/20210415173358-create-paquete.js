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
      codigo_barra: {
        type: Sequelize.STRING(128),
        primaryKey: true,
        allowNull: false,
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
      fecha_sys: {
        type: Sequelize.DATEONLY,
      },
      hora_sys: {
        type: Sequelize.TIME,
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