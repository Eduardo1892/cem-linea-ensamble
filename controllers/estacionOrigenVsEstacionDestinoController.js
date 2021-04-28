const {Estacion} = require('../config/db');



/* const crearEstacionOrigenVsEstacionDestino = async (req, res) => {
    try {

        const { codigo_estacion, codigo_item, cantidad } = req.body;

        if(!codigo_estacion || codigo_estacion.trim() === ""){
            return res.status(400).send({
                msg: 'Código de la estación es requerido'
            });
        }

        if(!codigo_item || codigo_item.trim() === ""){
            return res.status(400).send({
                msg: 'Código del item es requerido'
            });
        }

        if(!cantidad || cantidad.trim() === ""){
            return res.status(400).send({
                msg: 'Cantidad es requerida'
            });
        }

        //verifica si existe la combinación pregunta vs modulo.
        let estacionItem = await EstacionItem.findAll({
            where: {
                codigo_estacion,
                codigo_item
            }
        });

        if (estacionItem.length > 0) {
            return res.status(400).json({
                msg: 'El item ya está asignado a la estación'
            });
        }

        //Guarda la nueva relacion entre pregunta vs modulo.
        estacionItem = await EstacionItem.create({
            codigo_estacion,
            codigo_item,
            cantidad
        });

        //envía la respuesta
        res.json({
            estacionItem
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
} */

const listarEstacionesOrigenVsEstacionesDestino = async (req,res) => {
    res.json('entra')
}

module.exports = {
    listarEstacionesOrigenVsEstacionesDestino
}