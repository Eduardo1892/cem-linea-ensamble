require('dotenv').config();

module.exports = {
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "db_cem_linea_ensamble",
  host: process.env.DB_HOST || "localhost",
  dialect: process.env.DB_DIALECT || "mysql",
  //Almacenar seeders ejecutados en un archivo json
  //seederStorage: "json",
  //Archivo donde se guardara el json
  //seederStoragePath: "executedSeeds.json",
  //Almacenar seeders ejecutandos en una base de datos.
  seederStorage: "sequelize",
  //Tabla donde se almacenarán los registros
  seederStorageTableName: "sequelize_seeds",
  //Almacenar migraciones ejecutandas en una base de datos.
  migrationStorage: "sequelize",
  //Tabla donde se almacenarán los registros
  migrationStorageTableName: "sequelize_migrations",
  define: {
    timestamps: false
  }
}