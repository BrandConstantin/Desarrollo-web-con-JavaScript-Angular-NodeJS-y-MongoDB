'use strict'

//para acceder a las rutas y crear rutas
var express = require('express');
//cargar el controlador
var ArtistController = require('../controllers/artist');
//hacer las funciones de get, push etc
var api = express.Router();
//cargar el middleware para restringir el acceso a usu no identificados
var md_auth = require('../middlewares/authenticated');

//crear una ruta de prueba
api.get('/artist', md_auth.ensureAuth, ArtistController.getArtist);

module.exports = api;