const {Estacion, EstacionOrigenVsEstacionDestino} = require('../config/db');
const { Sequelize, Op } = require('sequelize');



const crearEstacionOrigenVsEstacionDestino = async (req, res) => {
    try {

        const { codigoEstacionOrigen, codigoEstacionDestino } = req.body;

        if(!codigoEstacionOrigen || codigoEstacionOrigen.trim() === ""){
            return res.status(400).send({
                msg: 'Código estación origen es requerido'
            });
        }

        if(!codigoEstacionDestino || codigoEstacionDestino.trim() === ""){
            return res.status(400).send({
                msg: 'Código estación destino es requerido'
            });
        }

        /* let estacionOrigen = await EstacionOrigenVsEstacionDestino.findByPk({
            where: {
                codigo_estacion_origen: codigoEstacionOrigen
            }
        });
        if (estacionOrigen) {
            return res.status(400).json({
                msg: 'La estación de origen ya existe'
            });
        }

        let estacionDestino = await EstacionOrigenVsEstacionDestino.findByPk({
            where: {
                codigo_estacion_destino: codigoEstacionDestino
            }
        });
        if (estacionDestino) {
            return res.status(400).json({
                msg: 'La estación de destino ya existe'
            });
        } */

        estacionOrigenVsEstacionDestino = await EstacionOrigenVsEstacionDestino.create({
            codigo_estacion_origen: codigoEstacionOrigen,
            codigo_estacion_destino: codigoEstacionDestino,
        });

        res.json({
            estacionOrigenVsEstacionDestino
        })

    } catch (error) {
        console.log(error);
        res.satus(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}

const listarEstacionesOrigenVsEstacionesDestino = async (req, res) => {

    const { codigoEstacion } = req.query;

    const estaciones = await Estacion.findAll({
        attributes:[
            'codigo',
            'descripcion',
            [Sequelize.literal(`(SELECT COUNT(*)
            FROM estaciones_origen_vs_estaciones_destino 
            WHERE  codigo_estacion_origen = '${codigoEstacion}'
            AND codigo_estacion_destino = estacion.codigo)`),'selected']
        ],
        where:{
            [Op.and]: [{codigo: {[Op.ne]: codigoEstacion}}]
        },
        order: [
            ['descripcion', 'ASC'],
        ] 
    })

    res.json({
        estaciones   
    })

}

const eliminarEstacionOrigenVsEstacionDestino = async (req, res) => {
    try {
        //obtengo el codigo del request
        const { codigoEstacionOrigen, codigoEstacionDestino } = req.params;




        //elimino el registro.
        estacionOrigenVsEstacionDestino = await EstacionOrigenVsEstacionDestino.destroy({
            where: {
                codigo_estacion_origen: codigoEstacionOrigen,
                codigo_estacion_destino: codigoEstacionDestino
            }
        });

        //envío una respuesta informando que el registro fue eliminado
        res.json({
            msg: 'Estación de destino eliminada correctamente de la estación de origen'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}


module.exports = {
    crearEstacionOrigenVsEstacionDestino,
    listarEstacionesOrigenVsEstacionesDestino,
    eliminarEstacionOrigenVsEstacionDestino
}