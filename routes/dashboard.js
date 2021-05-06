const express = require('express');
const router = express.Router();
const { 
    listarEstacionesDashBoard
} = require('../controllers/dashBoardController')


router.get('/listar', listarEstacionesDashBoard);

module.exports = router;