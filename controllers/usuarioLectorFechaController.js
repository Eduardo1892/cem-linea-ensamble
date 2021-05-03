const { Sequelize, Op, QueryTypes } = require('sequelize');
const db = require('../config/db');
const{
    UsuarioLectorFecha,
    Usuario,
    Lector
} = db;


const crearUsuariosLectoresFecha = async (req, res) => {

    const {codigoUsuario, codigoLector, fecha} = req.body;

    const usuarioExiste = await Usuario.findByPk(codigoUsuario)
    if(!usuarioExiste){
        return res.status(404).send({
            msg: 'El usuario no existe'
        })
    }
    const lectorExiste = await Lector.findByPk(codigoLector)
    if(!lectorExiste){
        return res.status(404).send({
            msg: 'El lector no existe'
        })
    }

    const usuarioLectorFechaExiste = await UsuarioLectorFecha.findOne({
        where: {
            [Op.and] : [
                { codigo_usuario: codigoUsuario},
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
            codigo_usuario: codigoUsuario,
            codigo_lector: codigoLector,
            fecha: Sequelize.literal('NOW()')
        })

        res.json({
            usuarioLectorFecha
        })
    }

    res.json({
        usuarioLectorFechaExiste
    })

}


const listarUsuariosLectoresFecha = async (req,res) => {
    res.json('entra')
}

module.exports = {
    crearUsuariosLectoresFecha,
    listarUsuariosLectoresFecha
}