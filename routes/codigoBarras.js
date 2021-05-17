const express = require('express');
const router = express.Router();
const { 
    crearCodigoBarra,
    listarCodigoBarra,
    eliminarCodigoBarra,
} = require('../controllers/codigoBarraController')


router.post('/crear', crearCodigoBarra);
router.get('/listar', listarCodigoBarra);
router.delete('/eliminar/:codigoBarra', eliminarCodigoBarra);


module.exports = router;