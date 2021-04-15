'use strict';

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Lector', {
    codigo: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    inactivo: {
      type: DataTypes.BOOLEAN,
    },
    
  }, {
    tableName: 'lectores',
  });
}