'use strict'

//cargamos modul express
var express = require('express');
//cargamos el fichero user controler
var UserController = require('../controllers/user');
//vamos a cargar el router de express
var api = express.Router();
//cargar modulo de autenticación
var md_auth = require('../middlewares/authenticated');

//crear una ruta
api.get('/probando-controlador', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);

//exportar api para que todas la rutas funcione
module.exports = api;