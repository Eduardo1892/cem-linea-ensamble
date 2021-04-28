'use strict';


module.exports = (sequelize, DataTypes, Item) => {
  return sequelize.define('CodigoBarras', {

    codigo_barra: {
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
    }

  }, {
    tableName: 'codigo_barras',
  });
};