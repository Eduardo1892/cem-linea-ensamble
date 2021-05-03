const express = require('express');
const router = express.Router();
const { 
    crearMaquina,
    buscarMaquinas,
    modificarMaquina,
    eliminarMaquina,
    datosMaquina 
} = require('../controllers/maquinaController')



router.post('/crear', crearMaquina);
router.get('/buscar', buscarMaquinas);
router.put('/modificar', modificarMaquina);
router.delete('/eliminar', eliminarMaquina);
router.get('/datos/:codigoMaquina', datosMaquina);

module.exports = router;