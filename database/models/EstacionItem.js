'use strict';

module.exports = (sequelize, DataTypes, Estacion, Item) => {
  return sequelize.define('EstacionItem', {

    codigo_estacion: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
      references:{
          model: Estacion,
          key: 'codigo'
      }
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
    cantidad: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    cantidad_registra_paquete: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }

  }, {
    tableName: 'estaciones_items',
  });
  
}