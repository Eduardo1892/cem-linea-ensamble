const { Sequelize, Op } = require('sequelize');
const { CodigoBarra } = require('../config/db');



const crearCodigoBarra = async (req, res) => {
    try {

        const { codigoBarra, codigoItem } = req.body;


        if(!codigoBarra || codigoBarra.trim() === ""){
            return res.status(400).send({
                msg: 'Código barra es requerido'
            });
        }

        if(!codigoItem || codigoItem.trim() === ""){
            return res.status(400).send({
                msg: 'Código item es requerido'
            });
        }

        //Verifico si el código de barras existe
        let codigoBarraExiste = await CodigoBarra.findByPk(codigoBarra);
        if (codigoBarraExiste) {
            return res.status(400).json({
                msg: 'El código barra ya existe'
            });
        }

        codigoBarras = await CodigoBarra.create({
            codigo_barra: codigoBarra, 
            codigo_item: codigoItem,
        });

        res.json({
            codigoBarras
        })

    } catch (error) {
        console.log(error);
        res.satus(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}

const listarCodigoBarra = async (req, res) => {

    const { codigoItem } = req.query;

    const codigoBarras = await CodigoBarra.findAll({
        where: {
            codigo_item : codigoItem
        },
        order: [
            ['codigo_barra', 'ASC'],
        ] 
    })

    res.json({
        codigoBarras
    })


}

const eliminarCodigoBarra = async (req, res) => {
    try {

        const { codigoBarra } = req.params;

        //Verifico si el código de barras existe
        let codigoBarras = await CodigoBarra.findByPk(codigoBarra);
        if (!codigoBarras) {
            return res.status(404).send({
                msg: `El código barra ${codigoBarra} no existe`
            });
        }

        //Elimino el registro
        codigoBarras = await CodigoBarra.destroy({
            where: {
                codigo_barra: codigoBarra
            }
        });

        res.json({
            msg: 'Código barra eliminado exitosamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}


module.exports = {
    crearCodigoBarra,
    listarCodigoBarra,
    eliminarCodigoBarra,
}



