const { EstacionItem, Estacion, Items } = require('../config/db');
const { Sequelize, Op } = require('sequelize');


const crearEstacionItem = async (req, res) => {
    try {

        const { codigoEstacion, codigoItem, cantidad, cantidadRegistraPaquete } = req.body;

        if(!codigoEstacion || codigoEstacion.trim() === ""){
            return res.status(400).send({
                msg: 'Código de la estación es requerido'
            });
        }

        if(!codigoItem || codigoItem.trim() === ""){
            return res.status(400).send({
                msg: 'Código del item es requerido'
            });
        }

        if(!cantidad || cantidad.trim() === ""){
            return res.status(400).send({
                msg: 'Cantidad es requerida'
            });
        }

        if(!cantidadRegistraPaquete || cantidadRegistraPaquete.trim() === ""){
            return res.status(400).send({
                msg: 'Cantidad registra paquete es requerida'
            });
        }


        //verifica si existe la estación
        let estacion = await Estacion.findByPk(codigoEstacion);
        if(!estacion) {
            return res.status(400).json({
                msg: 'la estación ingresada no es valida'
            });
        }

        //verifica si existe el item
        let item = await Items.findByPk(codigoItem);
        if(!item) {
            return res.status(400).json({
                msg: 'El item ingresado no es valido'
            });
        }

        //verifica si existe la combinación estación vs item.
        let estacionItem = await EstacionItem.findAll({
            where: {
                codigo_estacion: codigoEstacion,
                codigo_item: codigoItem,
            }
        });

        if (estacionItem.length > 0) {
            return res.status(400).json({
                msg: 'El item ya está asignado a la estación'
            });
        }

        //Guarda la nueva relacion entre pregunta vs modulo.
        estacionItem = await EstacionItem.create({
            codigo_estacion: codigoEstacion,
            codigo_item: codigoItem,
            cantidad,
            cantidad_registra_paquete: cantidadRegistraPaquete,
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
}

const buscarEstacionesItems = async (req,res) => {
    try {
        const estacionItem = await EstacionItem.findAll();

        res.json({
            estacionItem
        })

    } catch (error) {
        console.log(error);
        res.satus(500).send({
            msg: "Hubo un error, por favor vuelva a intentar"
        });
    }
}

const eliminarEstacionItem = async (req, res) => {
    try {
        //obtengo el codigo del request
        const { codigoEstacion, codigoItem } = req.params;

        


        //verifica si existe la combinación pregunta vs modulo.
        let estacionItem = await EstacionItem.findAll({
            where: {
                codigo_estacion: codigoEstacion,
                codigo_item: codigoItem
            }
        });

        if (estacionItem.length === 0) {
            return res.status(400).json({
                msg: 'El item no se encuentra asignado a la estación'
            });
        }

        //elimino el registro.
        estacionItem = await EstacionItem.destroy({
            where: {
                codigo_estacion: codigoEstacion,
                codigo_item: codigoItem
            }
        });

        //envío una respuesta informando que el registro fue eliminado
        res.json({
            msg: 'Item eliminado correctamente de la estación'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}

const listarItemsEstacion = async (req, res) => {

    const { codigoEstacion } = req.query;

    const items = await Items.findAll({
        attributes:[
            'codigo',
            'descripcion',
            [Sequelize.literal(`IFNULL((SELECT cantidad
            FROM estaciones_items 
            WHERE codigo_item = item.codigo 
            AND codigo_estacion = '${codigoEstacion}'), '0')    `),'cant_requerida'],
            [Sequelize.literal(`(SELECT COUNT(*)
            FROM estaciones_items 
            WHERE codigo_item = item.codigo 
            AND codigo_estacion = '${codigoEstacion}')`),'selected']
        ],
        order: [
            ['descripcion', 'ASC'],
        ] 
    })

    res.json({
        items   
    })

}

module.exports = {
    crearEstacionItem,
    buscarEstacionesItems,
    eliminarEstacionItem,
    listarItemsEstacion,
}