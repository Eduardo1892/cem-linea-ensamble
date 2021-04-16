const { Sequelize, Op, QueryTypes } = require('sequelize');
const uuidv4 = require('uuid').v4;
const db = require('../config/db');

const { 
    UsuarioLectorFecha,
    Paquete,
    Maquina,
    Items,
    EstacionItem,
} = db;


const crearPaquetes = async (req, res) => {

    const { codigoBarra, codigoLector, codigoMaquina } = req.body;

        const items = [{
            codigoItem: 'A',
            codigoBarras: 'CB1'
        },{
            codigoItem: 'B',
            codigoBarras: 'CB2'
        },{
            codigoItem: 'C',
            codigoBarras: 'CB3'
        },{
            codigoItem: 'D',
            codigoBarras: 'CB4',
        },{
            codigoItem: 'A',
            codigoBarras: 'CB5'
        }
    
        ];

        const codigoBarraExiste = items.filter(item => item.codigoBarras === codigoBarra)[0]

        if(!codigoBarraExiste){
            return res.status(404).send({
                msg: 'El codigo de barra no existe'
            });
        }

        //Validar que el item existe.
        let codigoItem = codigoBarraExiste.codigoItem;
        const itemExiste = await Items.findByPk(codigoItem)
        if(!itemExiste){
            return res.status(404).send({
                msg: 'El item no existe'
            });
        }

        //Obtiene el usuario según el lector y día trabajado.
        const usuarioLectorFecha = await UsuarioLectorFecha.findOne({
            where: {
                [Op.and] : [
                    { codigo_lector: codigoLector },
                    Sequelize.where(Sequelize.fn('DATE', Sequelize.col('fecha')), '=', Sequelize.fn('CURDATE')) 
                ],
            },
            order: [
                ['fecha', 'DESC'],
            ],
            limit: 1,
            raw: true,

        });

        if(!usuarioLectorFecha){
            return res.status(404).send({
                msg: `El lector ${codigoLector} hoy no ha sido asociado a un usuario`
            });
        }

        const codigoUsuario = usuarioLectorFecha.codigo_usuario;

        //Verifica que la máquina sea válida.
        const maquina = await Maquina.findOne({
            where: {
                codigo: codigoMaquina
            }
        });

        if(!maquina){
            return res.status(404).send({
                msg: `La máquina ${codigoMaquina} no es valida.`
            });
        }

        const codigoEstacion = maquina.codigo_estacion;

        //Verifica si el item es permitido en la estación.
        const itemPermitidoEstacion = await EstacionItem.findOne({
            where: {
                codigo_estacion : codigoEstacion,
                codigo_item: codigoItem,
            },
            raw: true,
        });

        //Obtengo la cantidad de items del tipo recibido que permite la estación.
        const cantidadItemPermitido = itemPermitidoEstacion.cantidad;

        if(!itemPermitidoEstacion){
            return res.status(404).send({
                msg: `EL item ${codigoItem} no es permitido en la estación ${codigoEstacion}`
            })
        }

        //Consultar si existe un paquete en proceso para el lector en la estacion que está envíando el item
        const paqueteEnProceso = await Paquete.findOne({
            where: {
                finalizado : 0,
                codigo_lector: codigoLector,
                codigo_estacion: codigoEstacion
            },
            raw: true,
        });

        let codigoPaquete = '';

        if(paqueteEnProceso){

            console.log('Hay un paquete sin finalizar');
            codigoPaquete = paqueteEnProceso.codigo;

            //Valido si el codigo de barra ya existe en el paquete que está en curso.
            const codigoBarraExiste = await Paquete.findOne({
                where: {
                    codigo: codigoPaquete,
                    codigo_item: codigoItem,
                    codigo_estacion: codigoEstacion,
                    codigo_barra : codigoBarra, 
                }
            })
            if(codigoBarraExiste){
                return res.status(400).send({
                    msg: `El código de barras ${codigoBarra} ya existe en el paquete en proceso ${codigoPaquete}`
                });
            }

        }else{

            console.log('No hay un paquete sin finalizar');
            codigoPaquete = uuidv4();

        }

        //Verifica la cantidad de items que permite la estación.
        //cantidadItemPermitido
        const cantidadItemProcesado = await Paquete.count({
            where: {
                codigo: codigoPaquete,
                codigo_item: codigoItem,
                codigo_estacion: codigoEstacion,
            }
        });
            
        if((cantidadItemProcesado + 1)  > cantidadItemPermitido){
            return res.status(400).send({
                msg: `La cantidad para el item ${codigoItem} ya se encuentra completa en el paquete`
            });
        }

     
        //Después de agregar el item al paquete, se debe validar si el paquete está completo
        const paquete = await Paquete.create({
            codigo: codigoPaquete,
            codigo_item: codigoItem,
            codigo_estacion: codigoEstacion,
            codigo_maquina: codigoMaquina,
            codigo_usuario: codigoUsuario,
            codigo_lector: codigoLector,
            codigo_barra: codigoBarra,
            fecha_sys: Sequelize.literal('CURDATE()'),
            hora_sys: Sequelize.literal('CURTIME()'),
            finalizado: false,
        });

        //Si el paquete cumple con todos los items exigidos en la estación, entonces el paquete
        //se finaliza.

        let qry = `
            SELECT 
                codigo_estacion,
                codigo_item,
                cantidad,
                cantidad_item_paquete,
                (cantidad - cantidad_item_paquete) AS diferencia
            FROM (
                SELECT 
                    codigo_estacion,
                    codigo_item,
                    cantidad,
                    (SELECT COUNT(*) 
                        FROM paquetes 
                        WHERE 
                        codigo = '${codigoPaquete}'
                        AND codigo_item = ei.codigo_item
                    ) AS cantidad_item_paquete,
                    (cantidad -
                    (SELECT COUNT(*) 
                        FROM paquetes 
                        WHERE codigo = '${codigoPaquete}'
                        AND codigo_item = ei.codigo_item
                    )) AS diferencia
                FROM estaciones_items ei
                WHERE ei.codigo_estacion = '${codigoEstacion}'
            )tb WHERE diferencia > 0;
        `;
        
        //Si no hay items pendientes para el paquete, entonces lo marca como finalizado.
        const itemsPendientesPaquete = await db.connection.query(qry, { type: QueryTypes.SELECT });
        if(itemsPendientesPaquete.length === 0){

            await Paquete.update({
                finalizado: true,
            },{
                where: {
                    codigo: codigoPaquete,
                }
            })

        }

        res.json({
            paquete,
            itemsPendientesPaquete,
        })

}

const listarPaquetes = async (req,res) => {
    res.json('entra')
}

module.exports = {
    crearPaquetes,
    listarPaquetes
}