const { Maquina, Estacion } = require('../config/db');
const { Sequelize, Op } = require('sequelize');




const crearMaquina = async (req, res) => {
    
    try {
        const { codigo, descripcion, codigoEstacion } = req.body;

        console.log(codigo, descripcion, codigoEstacion)

        if(!codigo || codigo.trim() === ""){
            return res.status(400).send({
                msg: 'Código es requerido'
            });
        }

        if(!descripcion || descripcion.trim() === ""){
            return res.status(400).send({
                msg: 'Descripción es requerido'
            });
        }

        if(!codigoEstacion || codigoEstacion.trim() === ""){
            return res.status(400).send({
                msg: 'Codigo estación es requerido'
            });
        }


        let maquina = await Maquina.findByPk(codigo);
        if (maquina) {
            return res.status(400).json({
                msg: 'La maquina ya existe'
            });
        }

        let estacion = await Estacion.findByPk(codigoEstacion);
        if (!estacion) {
            return res.status(400).json({
                msg: 'la estación ingresada no es valida'
            });
        }

        maquina = await Maquina.create({
            codigo,
            descripcion,
            codigo_estacion: codigoEstacion
        });

        res.json({
            maquina
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error'
        });
    }
}

const buscarMaquinas = async (req, res) => {
    try {

        const { filtro, codigoEstacion } = req.query;

        const maquinas = await Maquina.findAll({
            where: {
                [Op.and]:[
                    Sequelize.where(Sequelize.fn("concat", Sequelize.col("codigo"), Sequelize.col("descripcion")), {
                        [Op.like]: `%${filtro}%`
                    }),
                    { codigo_estacion: {[Op.eq]: codigoEstacion } }
                ]
            },
            order: [
                ['descripcion', 'ASC'],
            ] 
        });

        res.json({
            maquinas
        })

    } catch (error) {
        console.log(error);
        res.satus(500).send({
            msg: "Hubo un error, por favor vuelva a intentar"
        });
    }
}

const modificarMaquina = async (req, res) => {

    try {
        const { codigo, descripcion, codigoEstacion } = req.body;


        if(!codigo || codigo.trim() === ""){
            return res.status(400).send({
                msg: 'Código es requerido'
            });
        }

        if(!descripcion || descripcion.trim() === ""){
            return res.status(400).send({
                msg: 'Descripción es requerido'
            });
        }

        if(!codigoEstacion || codigoEstacion.trim() === ""){
            return res.status(400).send({
                msg: 'Codigo estación es requerido'
            });
        }

        let maquina = await Maquina.findByPk(codigo);
        if (!maquina) {
            return res.status(400).send({
                msg: `La maquina ${codigo} no existe`
            });
        }

        let estacion = await Estacion.findByPk(codigoEstacion);
        if (!estacion) {
            return res.status(400).send({
                msg: `La estación ${codigoEstacion} no existe`
            });
        }

        maquina = await Maquina.update({
            descripcion,
            codigo_estacion: codigoEstacion,
        }, {
            where: {
                codigo
            }
        });

        res.json({
            msg: "Maquina actualizada exitosamente"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Hubo un error, por favor vuelva a intentar"
        });
    }

}

const datosMaquina = async (req, res) => {

    try {
        
        const { codigoMaquina } = req.params;

        const maquina = await Maquina.findOne({
            include:[{
                model: Estacion,
                as: 'estacion'
            }],
            where:{
                codigo: codigoMaquina,
            }
        })
    
        if(!maquina){
            return res.status(404).send({
                msg: `La maquina ${codigoMaquina} no existe`
            })
        }
    
        res.json({maquina});

    } catch (error) {
        console.log(error)
        res.status(500).send({
            msg: 'Hubo un error'
        })
    }
}

const eliminarMaquina = async (req, res) => {

    try {

        const { codigo } = req.params;

        let maquina = await Maquina.findByPk(codigo);
        if (!maquina) {
            return res.status(404).send({
                msg: `La maquina ${codigo} no existe`
            });
        }


        maquina = await Maquina.destroy({
            where: {
                codigo
            }
        });

        res.json({
            msg: "Maquina eliminada correctamente"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Hubo un error, por favor vuelva a intentar"
        });
    }
}

module.exports = {
    crearMaquina,
    buscarMaquinas,
    modificarMaquina,
    eliminarMaquina,
    datosMaquina,
}