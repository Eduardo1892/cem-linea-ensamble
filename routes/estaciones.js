const express = require('express');
const router = express.Router();
const { 
    crearEstacion,
    buscarEstaciones,
    modificarEstacion,
    eliminarEstacion, 
    listarEstaciones,
} = require('../controllers/estacionController')


router.post('/crear', crearEstacion);
router.get('/buscar', buscarEstaciones);
router.put('/modificar', modificarEstacion);
router.delete('/eliminar/:codigo', eliminarEstacion);

router.get('/listar', listarEstaciones);

module.exports = router;