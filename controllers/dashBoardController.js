const { Sequelize, Op } = require('sequelize');
const { Estacion } = require('../config/db');

const listarEstacionesDashBoard = async (req, res) => {
    
    const estaciones = await Estacion.findAll({
        attributes: [
            'codigo', 
            'descripcion',
            [Sequelize.literal(`(SELECT COUNT(DISTINCT codigo) FROM paquetes 
            WHERE codigo_estacion = estacion.codigo AND fecha_sys = CURDATE())`),'paquetes']
        ],
        order: [
            ['descripcion', 'ASC'],
        ] 
    })

    res.json({
        estaciones
    })

}

module.exports = {
    listarEstacionesDashBoard
}