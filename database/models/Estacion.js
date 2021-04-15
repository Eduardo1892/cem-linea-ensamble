'use strict';


module.exports = (sequelize, DataTypes) => {

  return sequelize.define('Estacion', {
    
    codigo: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(128)
    },
    es_inicio: {
      type: DataTypes.BOOLEAN
    },
    es_termino: {
      type: DataTypes.BOOLEAN
    },
    es_qa: {
      type: DataTypes.BOOLEAN
    }

  },{
    tableName: 'estaciones',
  });

}