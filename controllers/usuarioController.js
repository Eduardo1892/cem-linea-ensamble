const bcrypt = require('bcrypt');
const { Usuario } = require('../config/db')


const listarUsuarios = async (req,res) => {

    const usuarios = await Usuario.findAll()

    res.json({
        usuarios
    })

}

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


module.exports = {
    listarUsuarios,
    crearUsuario
}