const bcrypt = require('bcrypt');
const { Usuario } = require('../config/db');

const autenticarUsuario = async (req, res) =>{

    try{
        const { codigo , password } = req.body

        if(!codigo || codigo.trim() === ''){
            return res.status(400).send({
                msg: 'Código es requerido'
            })
        }

        if(!password || password.trim() === ''){
            return res.status(400).send({
                msg: 'Password es requerido'
            })
        }
        
        //Revisa que el usuario existe
        let usuario = await Usuario.findByPk(codigo);
        if(!usuario){
            return res.status(400).json({
                msg: 'El usuario no existe'
            })
        }

        const passwordCorrecto = bcrypt.compareSync(password, usuario.password);
        if(!passwordCorrecto){
            return res.status(400).json({
                msg: 'El password es incorrecto'
            })
        }

        res.json({
            usuario
        })


    }catch(error){
        console.log(error)
        res.status(400).send('Hubo un error')
    }

}

module.exports = {
    autenticarUsuario
}