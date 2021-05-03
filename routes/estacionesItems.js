const express = require('express');
const router = express.Router();
const { 
    crearEstacionItem,
    buscarEstacionesItems,
    eliminarEstacionItem,
    listarItemsEstacion,
} = require('../controllers/estacionItemController')

router.post('/crear', crearEstacionItem);
router.get('/buscar', buscarEstacionesItems);
router.delete('/eliminar/:codigoEstacion/:codigoItem', eliminarEstacionItem);
router.get('/listar-items-estacion', listarItemsEstacion);

module.exports = router;