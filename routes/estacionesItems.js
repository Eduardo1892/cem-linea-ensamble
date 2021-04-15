const express = require('express');
const router = express.Router();
const { listarEstacionesItems } = require('../controllers/estacionItemController')


router.get('/listar', listarEstacionesItems)

module.exports = router;