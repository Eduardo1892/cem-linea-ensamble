const { Sequelize, Op, QueryTypes } = require('sequelize');
const uuidv4 = require('uuid').v4;
const db = require('../config/db');

const { 
    CodigoBarra,
    EstacionItem,
    Estacion,
    Items,
    Maquina,
    Paquete,
    UsuarioLectorFecha,  
} = db;


const crearPaquetes = async (req, res) => {

    try {

        const { codigoBarra, codigoLector, codigoMaquina, codigoUsuario } = req.body;
        let { codigoPaquete } = req.body;
        
        const codigoBarraExiste = await CodigoBarra.findByPk(codigoBarra)
        if(!codigoBarraExiste){
            return res.status(404).send({
                msg: 'El codigo de barra no existe'
            });
        }

        //Validar que el item existe.
        let codigoItem = codigoBarraExiste.codigo_item;
        const itemExiste = await Items.findByPk(codigoItem)
        if(!itemExiste){
            return res.status(404).send({
                msg: 'El item no existe'
            });
        }

        //Valida que el código de barra no haya sido utilizado.
        let codigoBarraProcesado = await Paquete.findOne({
            where: {
                codigo_barra : codigoBarra,
            }
        });

        if(codigoBarraProcesado){
            return res.status(400).send({
                msg: 'El código de barras ya fue procesado en un paquete'
            })
        }  
        

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
        
        const estacionEsInicial = await Estacion.findOne({
            where: {
                codigo: codigoEstacion
            }
        });

        if(estacionEsInicial.es_inicio === false && codigoPaquete === ''){
            return res.status(404).send({
                msg: 'Debe envíar el codigo del paquete'
            });
        }

       //Verifica si el item es permitido en la estación.
        const itemPermitidoEstacion = await EstacionItem.findOne({
            where: {
                codigo_estacion : codigoEstacion,
                codigo_item: codigoItem,
            },
            raw: true,
        });
        
        if(!itemPermitidoEstacion){
            console.log(`EL item ${codigoItem} no es permitido en la estación ${codigoEstacion}`)
            return res.status(404).send({
                msg: `EL item ${codigoItem} no es permitido en la estación ${codigoEstacion}`
            })
        }

        //Obtengo la cantidad de items del tipo recibido que permite la estación.
        const cantidadItemPermitido = itemPermitidoEstacion.cantidad;

        //Consultar si existe un paquete en proceso para el lector en la estacion que está envíando el item
        if(codigoPaquete === ''){
        
        const paqueteEnProceso = await Paquete.findOne({
            where: {
                finalizado : 0,
                codigo_lector: codigoLector,
                codigo_estacion: codigoEstacion
            },
            raw: true,
        });

        //let codigoPaquete = '';
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

        //si me paso el codigoPaquete
        }else{

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

        }

        //Verifica la cantidad de items que permite la estación.
        //cantidadItemPermitido
        let cantidadItemProcesado = await Paquete.count({
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
        let paquete = await Paquete.create({
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
            )tb;
        `;
        
        
        const itemsPendientesPaquete = await db.connection.query(qry, { type: QueryTypes.SELECT });
        //Si no hay items pendientes para el paquete, entonces lo marca como finalizado.
        if(itemsPendientesPaquete.filter(item => item.diferencia > 0).length === 0){

            await Paquete.update({
                finalizado: true,
            },{
                where: {
                    codigo: codigoPaquete,
                }
            })
        }


        res.json({
            itemsPendientesPaquete,
        }) 
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            msg:'Hubo un error'
        })
    }

    

}

const extraerCodigoPaquete = async (req, res) => {

        
        const { codigoBarra, codigoMaquina } = req.query;
        
        const codigoBarraExiste = await CodigoBarra.findByPk(codigoBarra)
        if(!codigoBarraExiste){
            return res.status(404).send({
                msg: `El codigo de barra ${codigoBarra} no existe`
            });
        }

        //Verifica si el item existe
        let codigoItem = codigoBarraExiste.codigo_item;
        const itemExiste = await Items.findByPk(codigoItem)
        if(!itemExiste){
            return res.status(404).send({
                msg: `El item ${codigoItem} del código de barras ${codigoBarra} no existe`
            })
        }

        //Verifica si el paquete existe
        const paqueteExiste = await Paquete.findOne({
            where: {
                codigo_item : codigoItem,
                codigo_barra: codigoBarra,
            },
            raw: true,
        });

        if(!paqueteExiste){
            return res.status(404).send({
                msg: `El código de barras ${codigoBarra} no está asignado a ningún paquete`
            });
        }

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
        //Mediante la máquina obtiene el código estación.
        const codigoEstacion = maquina.codigo_estacion;

        //Verifica si el paquete viene finalizado de la estación anterior
        const codigoPaquete = paqueteExiste.codigo

        const paqueteFinalizado = await Paquete.findOne({
            where: {
                codigo: codigoPaquete,
                codigo_estacion : {[Op.ne]: codigoEstacion},
                finalizado: false
            },
            raw: true,
        })

        if(paqueteFinalizado){
            const codigoEstacion = paqueteFinalizado.codigo_estacion
            return res.status(404).send({
                msg: `El paquete ${codigoPaquete} no está finalizado, devolver a estación ${codigoEstacion}`
            });
        }

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
            )tb;
        `;
        
        console.log(qry)
        
        const itemsPendientesPaquete = await db.connection.query(qry, { type: QueryTypes.SELECT });
        

        res.json({
            codigoPaquete,
            itemsPendientesPaquete,
        })

}



const listarPaquetes = async (req,res) => {
    res.json('entra')
}

module.exports = {
    crearPaquetes,
    extraerCodigoPaquete,
    listarPaquetes
}