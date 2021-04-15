const express = require('express');
const router = express.Router();
const { listarLectores } = require('../controllers/lectorController')


router.get('/listar', listarLectores)

module.exports = router;