const express = require('express');
const router = express.Router();
const { 
    crearEstacionOrigenVsEstacionDestino,
    listarEstacionesOrigenVsEstacionesDestino,
    eliminarEstacionOrigenVsEstacionDestino,
} = require('../controllers/estacionOrigenVsEstacionDestinoController')


router.post('/crear', crearEstacionOrigenVsEstacionDestino)
router.get('/listar', listarEstacionesOrigenVsEstacionesDestino)
router.delete('/eliminar/:codigoEstacionOrigen/:codigoEstacionDestino', eliminarEstacionOrigenVsEstacionDestino);

module.exports = router;