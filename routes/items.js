const express = require('express');
const router = express.Router();

const { listarItems } = require('../controllers/itemController')


router.get('/listar', listarItems);

module.exports = router;