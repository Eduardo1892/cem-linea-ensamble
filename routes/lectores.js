const express = require('express');
const router = express.Router();
const { 
    crearLector,
    listarLectores,
    modificarLector,
    eliminarLector,
} = require('../controllers/lectorController')


router.post('/crear', crearLector);
router.get('/listar', listarLectores);
router.put('/modificar', modificarLector);
router.delete('/eliminar', eliminarLector);

module.exports = router;