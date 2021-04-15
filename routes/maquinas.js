const express = require('express');
const router = express.Router();
const { listarMaquinas } = require('../controllers/maquinaController')


router.get('/listar', listarMaquinas)

module.exports = router;