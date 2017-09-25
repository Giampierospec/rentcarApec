var Empleado = require('../models/Empleado').model;
var apiOptions = require('../utils/serverLocation');
var request = require('request');

var Ctrl = (function(){
 var renderEmpleados = function(req, res, next){
     var path = apiOptions.server+ '/api/Empleado';
     var requestOptions = {
        url:path,
        method:'GET'
     };
     request(requestOptions, function(err, response, body){
        if(err){return next(err);}
        if(response.statusCode === 404){
            res.render('error');

        }
        var bod = JSON.parse(body);
        bod.fechaIngreso = new Date(bod.fechaIngreso).toString();
        res.render('Empleados',{
            title:'Empleados',
            data: bod
        });
        return;
     });
 };
 var renderInsertEmpleados = function(req, res, next){
    res.render('InsertEmpleado',{
        title:'Insertar nuevo empleado'
    });

 };
 var insertEmpleado = function (req, res, next) {
     var path = apiOptions.server + '/api/InsertEmpleado';
     var requestOptions = {
         url: path,
         method: 'POST',
         json: req.body
     };
     req.checkBody('email', 'el campo email es requerido').notEmpty();
     req.checkBody('password', 'el campo contraseña es requerido').notEmpty();
     req.checkBody('nombre', 'el campo nombre es requerido').notEmpty();
     req.checkBody('cedula', 'el campo cedula es requerido').notEmpty();
     req.checkBody('tanda', 'El campo tanda de labor es requerido').notEmpty();
     req.checkBody('estado', 'El campo estado es requerido').notEmpty();

     var errors = req.validationErrors();
     if (errors) {
         res.render('InsertEmpleado', {
             title: 'Insertar nuevo empleado',
             errors: errors
         });
         return;
     }
     else {
         Empleado.findOne({ email: req.body.email })
             .exec((err, emp) => {
                 if (err) { return next(err); }
                 if (emp) {
                     var error = new Error('El empleado ya existe');
                     res.render('InsertEmpleado', {
                         title: 'Insertar nuevo empleado',
                         error: error
                     });
                     return;
                 }
                 request(requestOptions, function (err, response, body) {
                     if (err) { return next(err); }
                     if (response.statusCode === 404) {
                         res.render('error');
                     }
                     res.redirect('/Empleados');
                     return;
                 });
             });
     }
 };
 var renderEditEmpleado = function(req, res, next){
    res.render('editEmpleado',{
        title: 'Editar empleado'
    });

 };
 var EditEmpleado = function (req, res, next) {
     var empId = req.params.empId;
     var path = apiOptions.server + '/api/editEmpleado/' + empId;
     var requestOptions = {
         url: path,
         method: 'PUT',
         json: req.body
     };
     req.checkBody('nombre', 'el campo nombre es requerido').notEmpty();
     req.checkBody('cedula', 'el campo cedula es requerido').notEmpty();
     req.checkBody('tanda', 'El campo tanda de labor es requerido').notEmpty();
     req.checkBody('estado', 'El campo estado es requerido').notEmpty();

     var errors = req.validationErrors();
     if (errors) {
         res.render('editEmpleado', {
             title: 'Editar empleado',
             errors: errrors
         });
         return;
     }
     else {
         request(requestOptions, function (err, response, body) {
             if (err) { return next(err); }
             if (response.statusCode === 404) {
                 res.render('error');
             }
             res.redirect('/Empleados');
             return;
         });
     }
 };
    return {
        renderEmpleados: renderEmpleados,
        renderInsertEmpleados: renderInsertEmpleados,
        insertEmpleados: insertEmpleado,
        renderEditEmpleado: renderEditEmpleado,
        editEmpleado: EditEmpleado
    };
})();

module.exports = Ctrl;