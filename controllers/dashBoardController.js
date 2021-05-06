const { Sequelize, Op } = require('sequelize');
const { Estacion } = require('../config/db');

const listarEstacionesDashBoard = async (req, res) => {
    
    const estaciones = await Estacion.findAll({
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