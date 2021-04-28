const bcrypt = require('bcrypt');
const { Usuario, Lector, UsuarioLectorFecha } = require('../config/db');
const { Op, Sequelize } = require('sequelize');

const autenticarUsuario = async (req, res) =>{

    try{
        const { codigo , password, codigoLector } = req.body

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
        
        if(!codigoLector || codigoLector.trim() === ''){
            return res.status(400).send({
                msg: 'Codigo lector es requerido'
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

        const lectorExiste = await Lector.findByPk(codigoLector);
        if(!lectorExiste){
            return res.status(400).send({
                msg: `El lector ${codigoLector} no existe`
            })
        }

        const usuarioLectorFechaExiste = await UsuarioLectorFecha.findOne({
            where: {
                [Op.and] : [
                    { codigo_usuario: codigo},
                    { codigo_lector: codigoLector },
                    Sequelize.where(Sequelize.fn('DATE', Sequelize.col('fecha')), '=', Sequelize.fn('CURDATE')) 
                ]
            },
            order: [
                ['fecha', 'DESC'],
            ],
            limit: 1,
            raw: true,
        });
    
        
        if(!usuarioLectorFechaExiste){
            
            const usuarioLectorFecha = await UsuarioLectorFecha.create({
                codigo_usuario: codigo,
                codigo_lector: codigoLector,
                fecha: Sequelize.literal('NOW()')
            })
        }
         

        
        res.json({
            usuario,
            lector: lectorExiste
        })


    }catch(error){
        console.log(error)
        res.status(400).send('Hubo un error')
    }

}

module.exports = {
    autenticarUsuario
}