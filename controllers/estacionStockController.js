const { 
    EstacionStock,
    Items, 
    Estacion, 
    Usuario } = require('../config/db');
const uuidv4 = require('uuid').v4;
const { Sequelize, Op } = require('sequelize');


const crearEstacionStcok = async (req, res) => {

    try{

        const { codigoBarra, codigoItem, codigoEstacion, 
        cantidadTotal, cantidadUtilizada, cantidadDisponible, codigoUsuario } = req.body;

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

        if(!codigoUsuario || codigoUsuario.trim() === ""){
            return res.status(400).send({
                msg: 'Código del usuario es requerido'
            });
        }

        //VERIFICA QUE EL ITEM EXISTE
        let item = await Items.findByPk(codigoItem);
        if(!item) {
            return res.status(400).json({
                msg: 'El item ingresado no es válido'
            });
        }

        //VERIFICA QUE LA ESTACION EXISTE
        let estacion = await Estacion.findByPk(codigoEstacion);
        if(!estacion) {
            return res.status(400).json({
                msg: 'La estación ingresada no es válida'
            });
        }

        //VERIFICA QUE EL USUARIO EXISTE
        let usuario = await Usuario.findByPk(codigoUsuario);
        if(!usuario) {
            return res.status(400).json({
                msg: 'El usuario ingresado no es válido'
            })
        }

        estacionStock = await EstacionStock.create({
            codigo: uuidv4(),
            codigo_barra: codigoBarra,
            codigo_item: codigoItem,
            codigo_estacion: codigoEstacion,
            cantidad_total: cantidadTotal,
            cantidad_utilizada: cantidadUtilizada,
            cantidad_disponible: cantidadDisponible,
            codigo_usuario: codigoUsuario,
            fecha_hora_entrega: new Date(),
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

const listarEstacionStock = async (req, res) => {

    const { codigoEstacion } = req.query;

    const estacionesStock = await EstacionStock.findAll({
       where:{
           codigo_estacion: codigoEstacion
       },
    
    })

    res.json({
        estacionesStock   
    })

}

const modificarEstacionStock = async (req, res) => {
    try{

        const { codigoBarra, codigoItem, codigoEstacion, 
        cantidadTotal, cantidadUtilizada, cantidadDisponible, codiogoUsuario } = req.body;

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

        if(!codigoUsuario || codigoUsuario.trim() === ""){
            return res.status(400).send({
                msg: 'Código del usuario es requerido'
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

        //VERIFICA QUE EL USUARIO EXISTE
        let usuario = await Usuario.findByPk(codigoUsuario);
        if(!usuario) {
            return res.status(400).json({
                msg: 'El usuario ingresado no es válido'
            })
        }

        let estacionStock = await EstacionStock.findByPk(codigoBarra)
        if(!estacionStock){
            return res.status(404).send({
                msg: `La estacion stock ${codigoBarra} no existe`
            })
        }


        estacionStock = await EstacionStock.update({
            codigo_item: codigoItem,
            codigo_estacion: codigoEstacion,
            cantidad_total: cantidadTotal,
            cantidad_utilizada: cantidadUtilizada,
            cantidad_disponible: cantidadDisponible,
        },{
            where: {
                codigo_barra: codigoBarra
            }
        })
        
        res.json({
            msg: "Estacion Stock actualizada exitosamente"
        })



    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }

}

const eliminarEstacionStock = async (req, res) => {
    try {

        const { codigoBarra } = req.params;

        let estacionStock = await EstacionStock.findByPk(codigoBarra);
        if (!estacionStock) {
            return res.status(404).send({
                msg: `La estación stock ${codigoBarra} no existe`
            });
        }


        estacionStock = await EstacionStock.destroy({
            where: {
                codigo_barra: codigoBarra
            }
        });

        res.json({
            msg: "Estacion stock eliminada correctamente"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Hubo un error, por favor vuelva a intentar"
        });
    }
}




module.exports = {
    crearEstacionStcok,
    listarEstacionStock,
    modificarEstacionStock,
    eliminarEstacionStock
}