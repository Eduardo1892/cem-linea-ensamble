const express = require('express');
const router = express.Router();
const { listarEstaciones } = require('../controllers/estacionController')


router.get('/listar', listarEstaciones)

module.exports = router;