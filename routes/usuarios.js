const express = require('express');
const router = express.Router();

const { 
    crearUsuario,
    listarUsuarios,
    modificarUsuario,
    eliminarUsuario,
} = require('../controllers/usuarioController')

router.post('/crear', crearUsuario);
router.get('/listar', listarUsuarios);
router.put('/modificar', modificarUsuario);
router.delete('/eliminar', eliminarUsuario);


module.exports = router;