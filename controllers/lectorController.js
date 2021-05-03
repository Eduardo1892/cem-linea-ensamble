const { Lector } = require('../config/db')
const { Sequelize, Op } = require('sequelize');


const crearLector = async (req, res) => {
    try {

        const { codigo, inactivo } = req.body;

        if(!codigo || codigo.trim() === ""){
            return res.status(400).send({
                msg: 'Código es requerido'
            });
        }

        let lector = await Lector.findByPk(codigo);
        if (lector) {
            return res.status(400).json({
                msg: 'El lector ya existe'
            });
        }

        lector = await Lector.create({
            codigo,
            inactivo
        });

        res.json({
            lector
        })

    } catch (error) {
        console.log(error);
        res.satus(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}

const buscarLectores = async (req,res) => {

    try{

        const { codigo } = req.query;

        if(!codigo || codigo.trim() === ''){
            return res.status(400).send({
                msg: 'Codigo es requerido'
            });
        }

        const lectores = await Lector.findAll({
            where: {
                codigo: {
                    [Op.like]: '%' + codigo + '%',
                }
            }
        });

        res.json({
            lectores
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Hubo un error, por favor vuelva a intentar"
        });
    }

}

const modificarLector = async (req, res) => {
    try {

        const { codigo, inactivo } = req.body;

        if(!codigo || codigo.trim() === ""){
            return res.status(400).send({
                msg: 'Código es requerido'
            });
        }

        let lector = await Lector.findByPk(codigo);
        if (!lector) {
            return res.status(404).send({
                msg: `El lector ${codigo} no existe`
            });
        }

        lector = await Lector.update({
            inactivo,
        }, {
            where: {
                codigo
            }
        });

        res.json({
            msg: "Lector actualizado exitosamente"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

const eliminarLector = async (req, res) => {
    try {

        const { codigo } = req.params;
        let lector = await Lector.findByPk(codigo);

        if (!lector) {
            return res.status(404).send({
                msg: `El lector ${codigo} no existe`
            });
        }


        lector = await Lector.destroy({
            where: {
                codigo
            }
        });

        res.json({
            msg: 'Lector eliminado exitosamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

module.exports = {
    crearLector,
    buscarLectores,
    modificarLector,
    eliminarLector,
}