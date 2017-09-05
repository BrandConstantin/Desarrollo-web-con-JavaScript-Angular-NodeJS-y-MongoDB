'use strict'
/* 
Los errores:
200 - cuando faltan datos, error de servidor, no se ha guardado un dato
400 - no existe un registro en la bd, o un dato en la bd
500 - error de excepción, o de no guardarse bien un dato
*/

//imortamos el modulo de bcrypt para encryptar directamente las contraseñas
var bcrypt = require('bcrypt-nodejs');
//importar el modelo
var User = require('../models/user');
//importar el token
var jwt = require('../services/jwt');

//creamos un metodo que recibe la petición y la devuelve
function pruebas(req, res) {
    res.status(200).send({
        message: 'Progando una acción del controlador del usuario del api'
    });
}

//guardar nuevos usuarios en la bd
//un nuevo método
function saveUser(req, res) {
    var user = new User();

    //recojer los parametros que llegan por el post
    var params = req.body;

    //ver que llega por los parametros
    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    //encryptar la pass
    if (params.password) {
        //encryptar
        bcrypt.hash(params.password, null, null, function(err, hash) {
            user.password = hash;

            if (user.name != null && user.surname != null && user.email != null) {
                //guardar el usuario
                user.save((err, userStored) => {
                    //si se ha guardado bien sino da un error
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar el usuario!' });
                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: 'No se ha registrado el usuario!' });
                        } else {
                            res.status(200).send({ user: userStored });
                        }
                    }
                });
            } else {
                res.status(200).send({ message: 'Tienes que rellenar todos los campos!' });
            }
        });
    } else {
        res.status(500).send({ message: 'Introduce la contraseña!' });
    }
} //guardar los datos en la bd

//crear método para el login
function loginUser(req, res) {
    //recojemos los parametros que nos llega por post y convertidos en objeto json
    var params = req.body;

    //recojemos email y password
    var email = params.email;
    var password = params.password;

    //buscamos en mongo el email y lo pasamos a lower case
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        //si existe el error
        if (err) {
            res.status(500).send({ message: 'Error en la petición!' });
        } else { //sino
            //si el usuario no existe
            if (!user) {
                res.status(404).send({ message: 'El usuario no existe!' });
            } else { //sino
                //comprobar la contraseña que llega por post
                bcrypt.compare(password, user.password, function(err, check) {
                    //si el check es correcto
                    if (check) {
                        //devolver los datos del usuario logueado
                        if (params.gethash) {
                            //devolver un token de jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else { //sino
                            res.status(200).send({ user });
                        }
                    } else {
                        res.status(404).send({ message: 'El usuario no se ha podido loguear!' });
                    }
                });
            }
        }
    });
}

//para poder utilizar estos metodos fuera del fichero lo exportamos
module.exports = {
    pruebas,
    saveUser,
    loginUser
};