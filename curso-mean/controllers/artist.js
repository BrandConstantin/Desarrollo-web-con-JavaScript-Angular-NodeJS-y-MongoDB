'use strict'

//incluir modulos para poder subir imágenes
var path = require('path');
var fs = require('fs');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

//crear método para sacar artista en la bd
function getArtist(req, res) {
    res.status(200).send({ message: 'Método de getArtist' });
}

//exportar modulos
module.exports = {
    getArtist
}