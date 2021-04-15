const express = require('express');
const router = express.Router();
const { autenticarUsuario } = require('../controllers/authController');

router.post('/', autenticarUsuario);

module.exports = router;