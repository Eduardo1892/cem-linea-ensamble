const { Items } = require('../config/db')
const { Sequelize, Op } = require('sequelize');

const crearItem = async (req, res) => {
    try {

        const { codigo, descripcion } = req.body;

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

        let item = await Items.findByPk(codigo);
        if (item) {
            return res.status(400).json({
                msg: 'El item ya existe'
            });
        }

        item = await Items.create({
            codigo,
            descripcion
        });

        res.json({
            item
        })

    } catch (error) {
        console.log(error);
        res.satus(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        })
    }
}

const buscarItems = async (req,res) => {

    try{

        const { filtro } = req.query;

        if(!filtro || filtro.trim() === ''){
            return res.status(400).send({
                msg: 'Filtro es requerido'
            });
        }

        const items = await Items.findAll({
            where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("codigo"), Sequelize.col("descripcion")), {
                [Op.like]: `%${filtro}%`
            }),
            order: [
                ['descripcion', 'ASC'],
            ] 
        });

        res.json({
            items
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Hubo un error, por favor vuelva a intentar"
        });
    }
}

const modificarItem = async (req, res) => {
    try {

        const { codigo, descripcion } = req.body;

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

        let item = await Items.findByPk(codigo);
        if (!item) {
            return res.status(404).send({
                msg: `El item ${codigo} no existe`
            });
        }

        item = await Items.update({
            descripcion,
        }, {
            where: {
                codigo
            }
        });

        res.json({
            msg: "Item actualizado exitosamente"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

const eliminarItem = async (req, res) => {
    try {

        const { codigo } = req.params;

        let item = await Items.findByPk(codigo);

        if (!item) {
            return res.status(404).send({
                msg: `El item ${codigo} no existe`
            });
        }


        item = await Items.destroy({
            where: {
                codigo
            }
        });

        res.json({
            msg: 'Item eliminado exitosamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

const listarItems = async (req, res) => {

    const items = await Items.findAll({
        order: [
            ['descripcion', 'ASC'],
        ] 
    })

    res.json({
        items
    })

}

module.exports = {
    crearItem,
    buscarItems,
    modificarItem,
    eliminarItem,
    listarItems,
}