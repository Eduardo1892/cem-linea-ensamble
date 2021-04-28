const bcrypt = require('bcrypt');
const { Sequelize, Op } = require('sequelize');
const { Usuario } = require('../config/db')



const crearUsuario = async (req, res) => {

    try {

        const { codigo, nombre, password } = req.body;

        if(!codigo || codigo.trim() === ""){
            return res.status(400).send({
                msg: 'Código es requerido'
            });
        }

        if(!nombre || nombre.trim() === ""){
            return res.status(400).send({
                msg: 'Nombre es requerido'
            });
        }

        if(!password || password.trim() === ""){
            return res.status(400).send({
                msg: 'Password es requerido'
            });
        }

        const usuarioExiste = await Usuario.findByPk(codigo);

        if(usuarioExiste){
            return res.status(400).send({
                msg: 'Código usuario ya existe'
            })
        }

        const hash = bcrypt.hashSync(password, 10);

        const usuario = await Usuario.create({
            codigo,
            nombre,
            password: hash,
        });

        res.json({
            usuario
        });
        
    } catch (error) {
        res.status(500).send({
            msg: 'Hubo un error'
        })
    }

}

const listarUsuarios = async (req,res) => {

    try{

        const { filtro } = req.query;

        if(!filtro || filtro.trim() === ''){
            return res.status(400).send({
                msg: 'Filtro es requerido'
            });
        }

        const usuarios = await Usuario.findAll({
            where: Sequelize.where(Sequelize.fn("concat", Sequelize.col("codigo"), Sequelize.col("nombre")), {
                [Op.like]: `%${filtro}%`
            }),
            order: [
                ['nombre', 'ASC'],
            ] 
        });

        res.json({
            usuarios
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: "Hubo un error, por favor vuelva a intentar"
        });
    }
    
}

const modificarUsuario = async (req, res) => {

    try {

        const { codigo, nombre, password, inactivo } = req.body;

        if(!codigo || codigo.trim() === ""){
            return res.status(400).send({
                msg: 'Código es requerido'
            });
        }

        if(!nombre || nombre.trim() === ""){
            return res.status(400).send({
                msg: 'Nombre es requerido'
            });
        }

        if(!password || password.trim() === ""){
            return res.status(400).send({
                msg: 'Password es requerido'
            });
        }

        let usuario = await Usuario.findByPk(codigo);
        if (!usuario) {
            return res.status(404).send({
                msg: `El usuario ${codigo} no existe`
            });
        }

        usuario = await Usuario.update({
            nombre,
            password,
            inactivo
        }, {
            where: {
                codigo
            }
        });

        res.json({
            msg: "Usuario actualizado exitosamente"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

const eliminarUsuario = async (req, res) => {
    try {

        const { codigo } = req.params;
        let usuario = await Usuario.findByPk(codigo);

        if (!usuario) {
            return res.status(404).send({
                msg: `El usuario ${codigo} no existe`
            });
        }


        usuario = await Usuario.destroy({
            where: {
                codigo
            }
        });

        res.json({
            msg: 'Usuario eliminado exitosamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            msg: 'Hubo un error, por favor vuelva a intentar'
        });
    }
}

module.exports = {
    crearUsuario,
    listarUsuarios,
    modificarUsuario,
    eliminarUsuario,
}