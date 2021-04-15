'use strict';

module.exports = (sequelize, DataTypes, Estacion) => {
  
  return sequelize.define('EstacionOrigenVsEstacionDestino', {

    codigo_estacion_origen: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
      references:{
        model: Estacion,
        key: 'codigo'
      }
    },
    codigo_estacion_destino: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
      references:{
        model: Estacion,
        key: 'codigo'
      }
    }

  }, {
    tableName: 'estaciones_origen_vs_estaciones_destino',
  });
  
}