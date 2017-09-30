var request = require('request');
var Inspeccion = require('../models/Inspeccion').model;
var apiOptions = require('../utils/serverLocation');

var Ctrl = (function(){
    var getAllVehiculosInspeccion = function(req, res, next){
        var path = apiOptions.server+'/api/vehiculosInspeccion';
        var requestOptions = {
            url: path,
            method: 'GET'
        };
        request(requestOptions, function(err, response, body){
            if(err){return next(err);}
            if(response.statusCode === 404){
                res.render('error');
                return;
            }
            res.render('VehiculosInspeccion',{
                title:'Inspeccion vehiculos',
                data: JSON.parse(body)
            });
            return;
        });
    };
    var renderGenInspeccion = function(req, res, next){
        res.render('insertInspeccion',{
            title:'Inspeccionar'
        });
    };
    var procesarInspeccion = function(req, res, next){
        var path = apiOptions.server+'/api/insertInspeccion/'+req.params.vehiculoDesc;
        req.body.vehiculo = req.params.vehiculoDesc;
        var requestOptions = {
            url: path,
            method: 'POST',
            json: req.body
        };
        req.checkBody('cliente', 'El campo cliente es requerido').notEmpty();
        req.checkBody('ralladura','El campo ralladura no puede estar vacio').notEmpty();
        req.checkBody('cantCombustible','El campo cantidad de combustible no puede estar vacio').notEmpty();
        req.checkBody('gomaRespuesta','El campo goma respuesta no puede estar vacio').notEmpty();
        req.checkBody('gato', 'El campo gato no puede estar vacio').notEmpty();
        req.checkBody('roturasCristal', 'El campo roturas cristal no puede estar vacio').notEmpty();
        req.checkBody('gomas', 'El campo estado de gomas no puede estar vacio').notEmpty();
        req.checkBody('empleado', 'El campo empleado no puede estar vacio').notEmpty();
        req.checkBody('estado', 'El estado gato no puede estar vacio').notEmpty();

        var errors = req.validationErrors();
        if(errors){
            res.render('insertInspeccion', {
                title: 'Inspeccionar',
                errors: errors
            });
            return;
        }else{
            request(requestOptions, function(err, response, body){
                    if(err){return next(err);}
                    if(response.statusCode === 404){
                        res.render('error');
                    }
                    res.redirect('/Inspeccion');
                    return;
            });
        }
    };

    var getInspeccionClientes = function(req, res, next){
        var clienteEmail = req.query.clienteEmail;
        var path = "";
        if(clienteEmail){
            path = apiOptions.server+'/api/getInspeccionClientes/?clienteEmail='+clienteEmail;
        }else{
            path = apiOptions.server +'/api/getInspeccionClientes';
        }
        var requestOptions = {
            url: path,
            method: 'GET'
        };
        request(requestOptions,function(err, response, body){
            if(err){return next(err);}
            if(response.statusCode === 404){
                res.render("error");
                return;
            }
            var insp = JSON.parse(body);
            var msg = "Todos";
            if(insp.cliente !== null){
                msg = insp.cliente;
            }
            res.render('ClientesInspeccion',{
                title: 'Inspeccion Clientes',
                data: insp.inspeccion,
                msg: msg
            });
            return;
        });
    };
    var getInspeccionEmpleados = function (req, res, next) {
        var empleadoEmail = req.query.empleadoEmail;
        var path = "";
        if (empleadoEmail) {
            path = apiOptions.server + '/api/getInspeccionEmpleados/?empleadoEmail=' + empleadoEmail;
        } else {
            path = apiOptions.server + '/api/getInspeccionEmpleados';
        }
        var requestOptions = {
            url: path,
            method: 'GET'
        };
        request(requestOptions, function (err, response, body) {
            if (err) { return next(err); }
            if (response.statusCode === 404) {
                res.render("error");
                return;
            }
            var insp = JSON.parse(body);
            var msg = "Todos";
            if (insp.cliente !== null) {
                msg = insp.empleado;
            }
            res.render('EmpleadosInspeccion', {
                title: 'Inspeccion Empleados',
                data: insp.inspeccion,
                msg: msg
            });
            return;
        });
    };
    return {
        getAllVehiculosInspeccion: getAllVehiculosInspeccion,
        renderGenInspeccion: renderGenInspeccion,
        procesarInspeccion: procesarInspeccion,
        getInspeccionClientes: getInspeccionClientes,
        getInspeccionEmpleados: getInspeccionEmpleados
    };
})();

module.exports = Ctrl;