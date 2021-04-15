const { Sequelize, Op } = require('sequelize');
const uuidv4 = require('uuid').v4
const { 
    UsuarioLectorFecha,
    Paquete,
    Maquina,
} = require('../config/db')



const crearPaquetes = async (req, res) => {

    const { codigo_barra, codigo_lector, codigo_maquina } = req.body;

        const items = [{
            codigo_item: 'A',
            codigo_barras: 'CB1'
        },{
            codigo_item: 'B',
            codigo_barras: 'CB2'
        },{
            codigo_item: 'C',
            codigo_barras: 'CB3'
        },{
            codigo_item: 'D',
            codigo_barras: 'CB4'
        }];

        const codigo_item = items.filter(item => item.codigo_barras === codigo_barra)[0].codigo_item
        
        
        const usuarioLectorFecha = await UsuarioLectorFecha.findAll({
            where: {
                [Op.and] : [
                    { codigo_lector },
                    Sequelize.where(Sequelize.fn('DATE', Sequelize.col('fecha')), '=', Sequelize.fn('CURDATE')) 
                ],
            },
            order: [
                ['fecha', 'DESC'],
            ],
            limit: 1

        });

        const codigo_usuario = usuarioLectorFecha[0].codigo_usuario;

        const maquina = await Maquina.findOne({
            where: {
                codigo: codigo_maquina
            }
        });

        const codigo_estacion = maquina.codigo_estacion;

        res.json({
            msg: 'OK'
        })

        //Validar que el item pinchado exista en la estacion vs items

        //Consultar si existe un paquete que no esté finalizado 
        //para el lector en la estacion que está envíando el item


        //Si hay un paquete que no esté finalizado, entonces validar
        //si existe ya el item

        //Después de agregar el item al paquete, se debe validar si el paquete está completo


    /*
    await Paquete.create({
        codigo: uuidv4(),
        codigo_item: '',
        codigo_estacion,
        codigo_maquina,
        codigo_usuario,
        codigo_lector,
        codigo_barra,
        fecha_sys: '',
        hora_sys: '',
        finalizado: false,
    })
    */

}

const listarPaquetes = async (req,res) => {
    res.json('entra')
}

module.exports = {
    crearPaquetes,
    listarPaquetes
}