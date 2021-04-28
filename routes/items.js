const express = require('express');
const router = express.Router();

const { 
    crearItem,
    listarItems,
    modificarItem,
    eliminarItem,
} = require('../controllers/itemController')


router.post('/crear', crearItem);
router.get('/listar', listarItems);
router.put('/modificar', modificarItem);
router.delete('/eliminar', eliminarItem);


module.exports = router;