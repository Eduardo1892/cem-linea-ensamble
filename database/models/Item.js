'use strict';


module.exports = (sequelize, DataTypes) => {
  
  return sequelize.define('item', {

    codigo: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(128)
    }
    
  },{
    tableName: 'items',
  });

}