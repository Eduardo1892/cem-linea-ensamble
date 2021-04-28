const { Lector } = require('../config/db')


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

const listarLectores = async (req,res) => {

    try{

        const { filtro } = req.query;

        if(!filtro || filtro.trim() === ''){
            return res.status(400).send({
                msg: 'Filtro es requerido'
            });
        }

        const lector = await Lector.findAll({
            where: {
                codigo: {
                    [Op.like]: '%' + filtro + '%',
                },
                inactivo: false
            }
        });

        res.json({
            lector
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
    listarLectores,
    modificarLector,
    eliminarLector,
}