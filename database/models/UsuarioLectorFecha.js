'use strict';

module.exports = (sequelize, DataTypes, Usuario, Lector) => {
  return sequelize.define('UsuarioLectorFecha', {
    codigo_usuario: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
      references: {
          model: Usuario,
          key: 'codigo'
      }
    },
    codigo_lector: {
      type: DataTypes.STRING(128),
      primaryKey: true,
      allowNull: false,
      references: {
          model: Lector,
          key: 'codigo'
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false
    }
    
  }, {
    tableName: 'usuarios_lectores_fecha',
  });

}