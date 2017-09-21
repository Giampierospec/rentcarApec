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
     Vehiculo.findOne({ descripcion: req.body.descripcion }, function (err, vh) {
         if (vh !== null || vn !== undefined) {
            var error = "El usuario ya existe intente denuevo";
            res.render('insertVehiculos',
                {
                    title: "Insertar nuevo vehiculo",
                    errors: error
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
    
 };

 var editVehiculo = function(req, res, next){
    var path = apiOptions.server + '/api/editVehiculo/'+req.params.idVehiculo;
    var requestOptions ={
        url: path,
        method: 'POST',
        json: req.body
    };
    request(requestOptions, function(err, response, body){
        if (err) { return next(err); }
        if (response.statusCode === 404) {
            res.render('error');
        }
        console.log(req.body);
        res.redirect('/Vehiculos');
    });
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