'use strict';

module.exports = (sequelize, DataTypes, Estacion, Item, Usuario) => {
  return sequelize.define('EstacionStock', {

    codigo: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    codigo_barra: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    codigo_item: {
      type: DataTypes.STRING(128),
      allowNull: false,
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
    cantidad_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_utilizada: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad_disponible: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    codigo_usuario: {
      type: DataTypes.STRING(128),
      allowNull: false,
      references:{
          model: Usuario,
          key: 'codigo'
      }
    },
    fecha_hora_entrega: {
      type: DataTypes.DATE,
      allowNull: false,
    }

  }, {
    tableName: 'estaciones_stock',
  });
  
}