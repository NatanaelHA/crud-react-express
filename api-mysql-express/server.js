const express = require('express');
const app = express();
const mySql = require('mysql');
const myConn = require('express-myconnection');
require('dotenv').config();
const dbOptions = { host: process.env.HOST, user: process.env.USER, password: process.env.PASSWORD, database: process.env.NAME }
const cors = require('cors');

// middlewares
app.use(myConn(mySql, dbOptions, 'single'));
app.use(express.json());
app.use(cors());

//pagina raiz
app.get('/', (req, res) => {
    res.send("bienvenido")
});

// rutas obtenidas --------------------------------------------------------------------------------//
const routes = require('./rutas');
app.use('/api', routes)

// middleware pagina no encontrada 
app.use((req, res, next) => {
    res.status(404).send('PAGINA NO ENCONTRADA');
});



// server PORT
app.set('port', process.env.PORT || 3001);
// server RUNNING
app.listen(app.get('port'), () => {
    console.log(`el servidor esta escuchando en el puerto ${app.get('port')}...`);
});