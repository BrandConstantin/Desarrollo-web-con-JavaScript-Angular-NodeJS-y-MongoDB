//
'use strict'

//cargar librerias express y body-parser
var express = require('express');
var bodyParser = require('body-parser');

//crear el objeto
var app = express();

//cargar rutas
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');

//configurar bodyParser
//convertir los datos que nos llega por las peticiones http en objeto
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//configurar cabeceras http

//rutas base
app.use('/api', user_routes);
app.use('/api', artist_routes);

//ejemplo de ruta
/*app.get('/pruebas', function(req, res) { //una función de callback
    res.status(200).send({ message: "Bienvenido al curos" });
});*/

//exportamos modulo
module.exports = app;