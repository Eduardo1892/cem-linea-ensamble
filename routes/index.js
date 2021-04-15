const express = require('express');
const app = express();
const router = express.Router();



//Home
router.get('/', (req, res) => res.json({ foo: 'bar'}));

app.use('/api/auth/', require('./auth'));
app.use('/api/usuarios/', require('./usuarios'));

app.use('/api/estaciones/', require('./estaciones'));
app.use('/api/maquinas/', require('./maquinas'));
app.use('/api/items/', require('./items'));

app.use('/api/estaciones-items', require('./estacionesItems'));
app.use('/api/estaciones-origen-vs-estaciones-destino', require('./estacionesOrigenVsEstacionesDestino'));

app.use('/api/lectores/', require('./lectores'));
app.use('/api/usuarios-lectores-fecha/', require('./usuariosLectoresFecha'));
app.use('/api/paquetes/', require('./paquetes'));

module.exports = router; 
module.exports = app;