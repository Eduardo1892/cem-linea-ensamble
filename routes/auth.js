const express = require('express');
const router = express.Router();
const { autenticarUsuario, autenticarUsuarioWeb } = require('../controllers/authController');

router.post('/', autenticarUsuario);
router.post('/web', autenticarUsuarioWeb);

module.exports = router;