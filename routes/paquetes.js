const express = require('express');
const router = express.Router();
const { crearPaquetes, extraerCodigoPaquete ,listarPaquetes } = require('../controllers/paqueteController')



router.post('/crear', crearPaquetes)
router.get('/extraer-codigo-paquete', extraerCodigoPaquete)
router.get('/listar', listarPaquetes)

module.exports = router;