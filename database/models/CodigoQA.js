'use strict';


module.exports = (sequelize, DataTypes, Item) => {
  return sequelize.define('codigoQa', {

    codigo_barra: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(128)
    }

  }, {
    tableName: 'codigos_qa',
  });
};