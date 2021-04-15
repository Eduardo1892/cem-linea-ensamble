const express = require('express');
const router = express.Router();
const { crearPaquetes ,listarPaquetes } = require('../controllers/paqueteController')



router.get('/crear', crearPaquetes)
router.get('/listar', listarPaquetes)

module.exports = router;