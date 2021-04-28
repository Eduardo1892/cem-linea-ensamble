const express = require('express');
const router = express.Router();
const { 
    crearEstacionItem,
    listarEstacionesItems,
    eliminarEstacionItem
} = require('../controllers/estacionItemController')


router.post('/crear', crearEstacionItem);
router.get('/listar', listarEstacionesItems);
router.delete('/eliminar', eliminarEstacionItem);

module.exports = router;