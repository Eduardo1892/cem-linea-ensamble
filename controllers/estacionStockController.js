const { EstacionStock ,Items, Estacion } = require('../config/db');
const { Sequelize, Op } = require('sequelize');


const crearEstacionStcok = async (req, res) => {

    try{

        const { codigoBarra, codigoItem, codigoEstacion, 
        cantidadTotal, cantidadUtilizada, cantidadDisponible } = req.body;

        if(!codigoBarra || codigoBarra.trim() === ""){
            return res.status(400).send({
                msg: 'Código de barra es requerido'
            });
        }

        if(!codigoItem || codigoItem.trim() === ""){
            return res.status(400).send({
                msg: 'Código del item es requerido'
            });
        }

        if(!codigoEstacion || codigoEstacion.trim() === ""){
            return res.status(400).send({
                msg: 'Código de la estación es requerido'
            });
        }

        //VERIFICA QUE EL ITEM EXISTE
        let item = await Items.findByPk(codigoItem);
        if(!item) {
            return res.status(400).json({
                msg: 'El item ingresado no es valido'
            });
        }

        //VERIFICA QUE LA ESTACION EXISTE
        let estacion = await Estacion.findByPk(codigoEstacion);
        if(!estacion) {
            return res.status(400).json({
                msg: 'la estación ingresada no es valida'
            });
        }

        estacionStock = await EstacionStock.create({
            codigo_barra: codigoBarra,
            codigo_item: codigoItem,
            codigo_estacion: codigoEstacion,
            cantidad_total: cantidadTotal,
            cantidad_utilizada: cantidadUtilizada,
            cantidad_disponible: cantidadDisponible,
        })
        
        res.json({
            estacionStock
        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }


}


module.exports = {
    crearEstacionStcok,
}