const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');
const db = {};

db.connection = new Sequelize(config.database, config.username, config.password, config);

//Obtenemos los modelos

const UsuarioModel = require('../database/models/Usuario');
const ItemModel = require('../database/models/Item');
const MaquinaModel = require('../database/models/Maquina');
const LectorModel = require('../database/models/Lector');
const EstacionModel = require('../database/models/Estacion');
const UsuarioLectorFechaModel = require('../database/models/UsuarioLectorFecha');
const EstacionItemModel = require('../database/models/EstacionItem');
const EstacionOrigenVsEstacionDestinoModel = require('../database/models/EstacionOrigenVsEstacionDestino');
const PaqueteModel = require('../database/models/Paquete');
const CodigoBarraModel = require('../database/models/CodigoBarras');


//Creamos una instancia del modelo,
db.Usuario = UsuarioModel(db.connection, DataTypes);

db.Items = ItemModel(db.connection, DataTypes);
db.Estacion = EstacionModel(db.connection, DataTypes);
db.Lector = LectorModel(db.connection, DataTypes);

db.Maquina = MaquinaModel(db.connection, DataTypes, db.Estacion);


db.UsuarioLectorFecha = UsuarioLectorFechaModel(db.connection, DataTypes, db.Usuario, db.Lector);

db.EstacionItem = EstacionItemModel(db.connection, DataTypes, db.Estacion, db.Items);
db.Paquete = PaqueteModel(db.connection, DataTypes, db.Items, db.Estacion, db.Maquina, db.Usuario, db.Lector);
db.CodigoBarra = CodigoBarraModel(db.connection, DataTypes, db.Items);


db.EstacionOrigenVsEstacionDestino = EstacionOrigenVsEstacionDestinoModel(db.connection, DataTypes, db.Estacion);


//Relaciones
db.Maquina.belongsTo(db.Estacion, {as: 'estacion', foreignKey: 'codigo_estacion' });
db.Estacion.hasMany(db.Maquina, {as: 'maquinas', foreignKey: 'codigo_estacion'});

 
module.exports = db;