const { Maquina, Estacion } = require('../config/db');



const crearMaquina = async (req, res) => {
    
    try {
        const { codigo, descripcion, codigo_estacion } = req.body;

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

        if(!codigo_estacion || codigo_estacion.trim() === ""){
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

        let estacion = await Estacion.findByPk(codigo_estacion);
        if (!estacion) {
            return res.status(400).json({
                msg: 'la estación ingresada no es valida'
            });
        }

        maquina = await Maquina.create({
            codigo,
            descripcion,
            codigo_estacion
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

const listarMaquinas = async (req, res) => {
    try {
        const maquinas = await Maquina.findAll();

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
        const { codigo, descripcion, codigo_estacion } = req.body;

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

        if(!codigo_estacion || codigo_estacion.trim() === ""){
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

        let estacion = await Estacion.findByPk(codigo_estacion);
        if (!estacion) {
            return res.status(400).send({
                msg: `La estación ${codigo_estacion} no existe`
            });
        }

        maquina = await Maquina.update({
            descripcion,
            codigo_estacion,
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
    listarMaquinas,
    modificarMaquina,
    eliminarMaquina,
    datosMaquina,
}