'use strict';

module.exports = (sequelize, DataTypes, Item, Estacion, Maquina, Usuario, Lector) => {
  return sequelize.define('Paquete', {

    codigo: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    codigo_item: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
      references:{
        model: Item,
        key: 'codigo'
      }
    },
    codigo_estacion: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
      references:{
        model: Estacion,
        key: 'codigo'
      }
    },
    codigo_maquina: {
      type: DataTypes.STRING(128),
      allowNull: false,
      references:{
        model: Maquina,
        key: 'codigo'
      }
    },
    codigo_usuario: {
      type: DataTypes.STRING(128),
      allowNull: false,
      references:{
        model: Usuario,
        key: 'codigo'
      }
    },
    codigo_lector: {
      type: DataTypes.STRING(128),
      allowNull: false,
      references:{
        model: Lector,
        key: 'codigo'
      }
    },
    codigo_barras: {
      type: DataTypes.STRING(128)
    },
    fecha_sys: {
      type: DataTypes.DATE,
    },
    hora_sys: {
      type: DataTypes.DATE,
    },
    finalizado: {
      type: DataTypes.BOOLEAN
    }

  }, {
    tableName: 'paquetes',
  });
};