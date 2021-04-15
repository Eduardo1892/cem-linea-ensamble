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
    requerido: {
      type: DataTypes.BOOLEAN,
    }

  }, {
    tableName: 'estaciones_items',
  });
  
}