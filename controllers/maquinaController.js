const { Maquina, Estacion } = require('../config/db');

const listarMaquinas = async (req,res) => {
    const maquinas = await Maquina.findAll({
        include: [{
            model: Estacion,
            as: 'estacion'
        }]
    });

    res.json({
        maquinas
    })
}

module.exports = {
    listarMaquinas
}