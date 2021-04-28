'use strict';


module.exports = (sequelize, DataTypes) => {

  return sequelize.define('Usuario', {

    codigo: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(128),
    },
    password: {
      type: DataTypes.STRING(128),
    },
    inactivo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
    
  }, {
    tableName: "usuarios"
  })

}