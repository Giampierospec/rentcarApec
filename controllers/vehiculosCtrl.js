var request = require('request');
var Vehiculo = require('../models/Vehiculo').model;
var apiOptions = require('../utils/serverLocation');
/**
 * Controlador que determina todas las funciones concernientes a los vehiculos
 */
var vehiculos = (function(){
 var getVehiculos = function(req, res, next){
    var path = apiOptions.server +'/api/Vehiculos';
    var requestOptions = {
        method: 'GET',
        url: path
    };
    request(requestOptions, function(err, response, body){
        if(err){return next(err);}
        if(response.statusCode === 404){
            res.render('error');
        }
        console.log(JSON.parse(body));

        res.render('Vehiculos',{
            title:"Vehiculos",
            data: JSON.parse(body)
        });
    });
 };
 var renderInsertVehiculo = function(req, res, next){
        res.render('insertVehiculos', {
            title:'Insertar nuevo vehiculo'
        });
 };
 var renderEditVehiculo = function(req, res, next){
    res.render('editVehiculo',{title:'Editar Vehiculo'});
 };
 var insertNewVehiculo = function(req, res, next){
     //Validaciones que no hayan dejado campos vacios
     req.checkBody('descripcion','El campo descripcion es requerido').notEmpty();
     req.checkBody('noPlaca', 'El campo placa es requerido').notEmpty();
     req.checkBody('noMotor','El campo numero Motor es requerido').notEmpty();
     req.checkBody('noChasis', 'El campo numero Chasis es requerido').notEmpty();
     req.checkBody('tipoVehiculo', 'El campo tipo Vehiculo es requerido').notEmpty();
     req.checkBody('marcaDesc','El campo marca es requerido').notEmpty();
     req.checkBody('modelo', 'El campo modelo es requerido').notEmpty();
     req.checkBody('tipoCombustible','El campo tipo Combustible es requerido').notEmpty();
     req.checkBody('estado', 'El campo estado  es requerido').notEmpty();
     
     errors = req.validationErrors();
     if(errors){
         res.render('insertVehiculos',{
             title: "Insertar nuevo vehiculo",
             errors: errors
         });
         return;
     }
     else{
     Vehiculo.findOne({ descripcion: req.body.descripcion }, function (err, vh) {
         if (vh) {
             console.log(vh);
            var error = new Error("El usuario ya existe intente denuevo");
            res.render('insertVehiculos',
                {
                    title: "Insertar nuevo vehiculo",
                    error: error.message
                });
        return;
         }
         
         var path = apiOptions.server + '/api/InsertVehiculos';
         var requestOptions = {
             url: path,
             method: 'POST',
             json: req.body
         };
         request(requestOptions, function (err, response, body) {
             if (err) { return next(err); }
             if (response.statusCode === 404) {
                 res.render('error');
             }
             console.log(req.body);
             res.redirect('/Vehiculos');
         });
        });
    }
 };

 var editVehiculo = function(req, res, next){
    var path = apiOptions.server + '/api/editVehiculo/'+req.params.idVehiculo;
    var requestOptions ={
        url: path,
        method: 'POST',
        json: req.body
    };
    //Validaciones que no hayan dejado campos vacios
    req.checkBody('descripcion', 'El campo descripcion es requerido').notEmpty();
    req.checkBody('noPlaca', 'El campo placa es requerido').notEmpty();
    req.checkBody('noMotor', 'El campo numero Motor es requerido').notEmpty();
    req.checkBody('noChasis', 'El campo numero Chasis es requerido').notEmpty();
    req.checkBody('tipoVehiculo', 'El campo tipo Vehiculo es requerido').notEmpty();
    req.checkBody('marcaDesc', 'El campo marca es requerido').notEmpty();
    req.checkBody('modelo', 'El campo modelo es requerido').notEmpty();
    req.checkBody('tipoCombustible', 'El campo tipo Combustible es requerido').notEmpty();
    req.checkBody('estado', 'El campo estado  es requerido').notEmpty();

    errors = req.validationErrors();
    if (errors) {
        res.render('editVehiculo', {
            title: "Editar Vehiculo",
            errors: errors
        });
        return;
    }
    else {
    request(requestOptions, function(err, response, body){
        if (err) { return next(err); }
        if (response.statusCode === 404) {
            res.render('error');
        }
        console.log(req.body);
        res.redirect('/Vehiculos');
    });
}
 };
 return {
     getVehiculos: getVehiculos,
     renderInsertVehiculo: renderInsertVehiculo,
     insertNewVehiculo: insertNewVehiculo,
     renderEditVehiculo: renderEditVehiculo,
     editVehiculo: editVehiculo
 };
})();


module.exports = vehiculos;