const express = require('express');
const router = express.Router();
const { crearPaquetes, crearPaquetesQA, extraerCodigoPaquete ,listarPaquetes } = require('../controllers/paqueteController')



router.post('/crear', crearPaquetes);
router.post('/crear-qa', crearPaquetesQA);
router.get('/extraer-codigo-paquete', extraerCodigoPaquete);
router.get('/listar', listarPaquetes);

module.exports = router;