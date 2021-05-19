const { Sequelize, Op } = require('sequelize');
const { Estacion } = require('../config/db');

const listarEstacionesDashBoard = async (req, res) => {
    
    const estaciones = await Estacion.findAll({
        attributes: [
            'codigo', 
            'descripcion',
            [Sequelize.literal(`(SELECT COUNT(DISTINCT codigo) FROM paquetes 
            WHERE codigo_estacion = estacion.codigo AND fecha_sys = CURDATE())`),'paquetes'],
            [Sequelize.literal(`(SELECT it.descripcion 
            FROM paquetes pq
            LEFT JOIN items it ON it.codigo = pq.codigo_item
            WHERE codigo_estacion = estacion.codigo
            ORDER BY fecha_sys DESC, hora_sys DESC
            LIMIT 1)`), 'codigo_ultimo_item'],
            [Sequelize.literal(`(SELECT est.descripcion 
            FROM paquetes pq
            LEFT JOIN estaciones est ON est.codigo = pq.codigo_estacion
            WHERE codigo_estacion = estacion.codigo
            ORDER BY fecha_sys DESC, hora_sys DESC
            LIMIT 1)`), 'codigo_ultima_estacion'],
            [Sequelize.literal(`(SELECT fecha_sys
            FROM paquetes
            WHERE codigo_estacion = estacion.codigo
            ORDER BY fecha_sys DESC, hora_sys DESC
            LIMIT 1)`), 'ultima_fecha'],
            [Sequelize.literal(`(SELECT hora_sys
            FROM paquetes
            WHERE codigo_estacion = estacion.codigo
            ORDER BY fecha_sys DESC, hora_sys DESC
            LIMIT 1)`), 'ultima_hora'],
            [Sequelize.literal(`(SELECT us.nombre 
            FROM paquetes pq
            LEFT JOIN usuarios us ON us.codigo = pq.codigo_usuario
            WHERE codigo_estacion = estacion.codigo
            ORDER BY fecha_sys DESC, hora_sys DESC
            LIMIT 1)`), 'codigo_ultimo_usuario']
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