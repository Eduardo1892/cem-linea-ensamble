const express = require('express');
const router = express.Router();
const { 
    crearEstacionStcok, listarEstacionStock, modificarEstacionStock, eliminarEstacionStock
} = require('../controllers/estacionStockController')

router.post('/crear', crearEstacionStcok);
router.get('/listar', listarEstacionStock);
router.put('/modificar', modificarEstacionStock);
router.delete('/eliminar/:codigoBarra', eliminarEstacionStock);

module.exports = router;
