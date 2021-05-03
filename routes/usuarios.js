const express = require('express');
const router = express.Router();

const { 
    crearUsuario,
    buscarUsuarios,
    modificarUsuario,
    eliminarUsuario,
    listarUsuarios
} = require('../controllers/usuarioController')

router.post('/crear', crearUsuario);
router.get('/buscar', buscarUsuarios);
router.put('/modificar', modificarUsuario);
router.delete('/eliminar/:codigo', eliminarUsuario);

router.get('/listar', listarUsuarios)


module.exports = router;