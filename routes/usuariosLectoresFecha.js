const express = require('express');
const router = express.Router();
const { listarUsuariosLectoresFecha } = require('../controllers/usuarioLectorFechaController')


router.get('/listar', listarUsuariosLectoresFecha)

module.exports = router;