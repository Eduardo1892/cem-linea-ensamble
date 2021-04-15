'use strict';

module.exports = (sequelize, DataTypes, Estacion) => {

  return sequelize.define('Maquina', {

    codigo: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(128)
    },
    codigo_estacion: {
      type: DataTypes.STRING(128),
      allowNull: false,
      references: {
          model: Estacion,
          key: 'codigo'
      }
    },
    
  }, {
    tableName: 'maquinas',
  });

}