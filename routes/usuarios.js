const express = require('express');
const router = express.Router();

const { 
    listarUsuarios,
    crearUsuario
} = require('../controllers/usuarioController')


router.get('/listar', listarUsuarios);
router.post('/crear', crearUsuario);

module.exports = router;