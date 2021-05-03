const { Sequelize, Op } = require('sequelize');
const { Estacion } = require('../config/db');




const crearEstacion = async (req, res) => {
    try {

        const { codigo, descripcion, es_inicio, es_termino, es_qa } = req.body;


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

        let estacion = await Estacion.findByPk(codigo);
        if (estacion) {
            return res.status(400).json({
                msg: 'La estación ya existe'
            });
        }

        estacion = await Estacion.create({
            codigo,
            descripcion,
            es_inicio,
            es_termino,
            es_qa
        });

        res.json({
            estacion
        })

    } catch (error) {
        console.log(error);
        res.satus(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}

const buscarEstaciones = async (req, res) => {

    try{

        const { filtro } = req.query;

        if(!filtro || filtro.trim() === ''){
            return res.status(400).send({
                msg: 'Filtro es requerido'
            });
        }

        const estaciones = await Estacion.findAll({
            where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("codigo"), Sequelize.col("descripcion")), {
                [Op.like]: `%${filtro}%`
            }),
            order: [
                ['descripcion', 'ASC'],
            ] 
        });


        res.json({
            estaciones
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Hubo un error, por favor vuelva a intentar"
        });
    }  
}

const modificarEstacion = async (req, res) => {
    try {

        const { codigo, descripcion, es_inicio, es_termino, es_qa } = req.body;

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

        let estacion = await Estacion.findByPk(codigo);
        if (!estacion) {
            return res.status(404).send({
                msg: `La estación ${codigo} no existe`
            });
        }

        estacion = await Estacion.update({
            descripcion,
            es_inicio,
            es_termino,
            es_qa,
        }, {
            where: {
                codigo
            }
        });

        res.json({
            msg: "Estación actualizada exitosamente"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

const eliminarEstacion = async (req, res) => {
    try {

        const { codigo } = req.params;


        let estacion = await Estacion.findByPk(codigo);

        if (!estacion) {
            return res.status(404).send({
                msg: `La estación ${codigo} no existe`
            });
        }


        estacion = await Estacion.destroy({
            where: {
                codigo
            }
        });

        res.json({
            msg: 'Estación eliminada exitosamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

const listarEstaciones = async (req, res) => {

    const estaciones = await Estacion.findAll({
        order: [
            ['descripcion', 'ASC'],
        ] 
    })

    res.json({
        estaciones
    })


}



module.exports = {
    crearEstacion,
    buscarEstaciones,
    modificarEstacion,
    eliminarEstacion,
    listarEstaciones,
}