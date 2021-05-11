const express = require('express');
const router = express.Router();
const { 
    crearEstacionStcok
} = require('../controllers/estacionStockController')

router.post('/crear', crearEstacionStcok);

module.exports = router;
