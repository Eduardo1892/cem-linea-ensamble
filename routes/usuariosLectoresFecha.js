const express = require('express');
const router = express.Router();
const { crearUsuariosLectoresFecha, listarUsuariosLectoresFecha } = require('../controllers/usuarioLectorFechaController')

router.post('/crear', crearUsuariosLectoresFecha);
router.get('/listar', listarUsuariosLectoresFecha);

module.exports = router;