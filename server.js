const express = require('express');
const app = express();
const { connection } = require('./config/db');
const cors = require('cors')


const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/index'))

//socket
const server = require('http').createServer(app)
const io = require('socket.io')(server,{
    cors: {
        origin: '*'
    }
})

//const { socketEvents } = require('./sockets')
process.setMaxListeners(10);

io.sockets.on('connection', socket => {

    console.log('Cliente conectado...'+socket.id, io.engine.clientsCount)

    socket.emit("onconnected", data => {
        console.log(data)
    });

    //socketEvents(socket)

    socket.on('saludar', (data, callback) => {
        console.log(data)
        callback()
        socket.emit('recibir-saludo-'+data.usuario, {
            data: 'hola'
        })
        
    })


    socket.on('disconnect', () => {
        console.log('Cliente desconectado! quedan',io.engine.clientsCount)
    });

});



server.listen(PORT, function () {
    console.log(`La app ha arrancado en el http://localhost:${PORT}`);

    connection.sync({ force: true }).then(() => {
        console.log('Se ha establecido la conexión')
    }) 
})