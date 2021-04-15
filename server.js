const express = require('express');
const app = express();
const { connection } = require('./config/db');

const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('./routes/index'))

app.listen(PORT, function () {
    console.log(`La app ha arrancado en el http://localhost:${PORT}`);

    connection.sync({ force: false }).then(() => {
        console.log('Se ha establecido la conexión')
    }) 
})