'use strict';

module.exports = (sequelize, DataTypes, Item, Estacion, Maquina, Usuario, Lector, CodigoQa) => {
  return sequelize.define('Paquete', {
    
    codigo: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    numero: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    codigo_item: {
      type: DataTypes.STRING(128),
      allowNull: true,
      references:{
        model: Item,
        key: 'codigo'
      }
    },
    codigo_estacion: {
      type: DataTypes.STRING(128),
      allowNull: false,
      references:{
        model: Estacion,
        key: 'codigo'
      }
    },
    codigo_barra: {
      type: DataTypes.STRING(128),
      allowNull: true,
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
    codigo_qa: {
      type: DataTypes.STRING(128),
      allowNull: true,
      references:{
        model: CodigoQa,
        key: 'codigo'
      }
    },
    observacion: {
      type: DataTypes.STRING(128)
    },
    cantidad_item: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    fecha_sys: {
      type: DataTypes.DATEONLY,
    },
    hora_sys: {
      type: DataTypes.TIME,
    },
    finalizado: {
      type: DataTypes.BOOLEAN
    }

  }, {
    tableName: 'paquetes',
  });
};