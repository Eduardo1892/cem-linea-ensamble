const express = require('express');
const router = express.Router();

const { 
    crearItem,
    buscarItems,
    modificarItem,
    eliminarItem,
    listarItems,
} = require('../controllers/itemController')


router.post('/crear', crearItem);
router.get('/buscar', buscarItems);
router.put('/modificar', modificarItem);
router.delete('/eliminar/:codigo', eliminarItem);

router.get('/listar', listarItems);


module.exports = router;