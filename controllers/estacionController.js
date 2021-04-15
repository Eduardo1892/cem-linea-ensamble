const { Estacion, Maquina } = require('../config/db');


const listarEstaciones = async (req, res) => {

    const estaciones = await Estacion.findAll({
        include: [{
            model: Maquina,
            as: 'maquinas'
        }]
    });

    res.json({
        estaciones
    })   
}

module.exports = {
    listarEstaciones
}