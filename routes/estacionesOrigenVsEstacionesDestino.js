const express = require('express');
const router = express.Router();
const { listarEstacionesOrigenVsEstacionesDestino } = require('../controllers/estacionOrigenVsEstacionDestinoController')


router.get('/listar', listarEstacionesOrigenVsEstacionesDestino)

module.exports = router;