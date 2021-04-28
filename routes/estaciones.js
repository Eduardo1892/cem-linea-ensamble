const express = require('express');
const router = express.Router();
const { 
    crearEstacion,
    listarEstaciones,
    modificarEstacion,
    eliminarEstacion, 
} = require('../controllers/estacionController')


router.post('/crear', crearEstacion);
router.get('/listar', listarEstaciones);
router.put('/modificar', modificarEstacion);
router.delete('/eliminar/:codigo', eliminarEstacion);

module.exports = router;