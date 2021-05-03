const express = require('express');
const router = express.Router();
const { 
    crearLector,
    buscarLectores,
    modificarLector,
    eliminarLector,
} = require('../controllers/lectorController')


router.post('/crear', crearLector);
router.get('/buscar', buscarLectores);
router.put('/modificar', modificarLector);
router.delete('/eliminar/:codigo', eliminarLector);

module.exports = router;