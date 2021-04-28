const express = require('express');
const router = express.Router();
const { 
    crearMaquina,
    listarMaquinas,
    modificarMaquina,
    eliminarMaquina,
    datosMaquina 
} = require('../controllers/maquinaController')



router.post('/crear', crearMaquina);
router.get('/listar', listarMaquinas);
router.put('/modificar', modificarMaquina);
router.delete('/eliminar', eliminarMaquina);
router.get('/datos/:codigoMaquina', datosMaquina);

module.exports = router;