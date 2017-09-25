var Cliente = require('../models/Clientes').model;
var request = require('request');
var apiOptions = require('../utils/serverLocation');

var Ctrl = (function(){
    var renderClientes = function(req, res, next){
        var path = apiOptions.server+'/api/Clientes';
        var requestOptions = {
            url: path,
            method:'GET'
        };
        request(requestOptions,function(err, response, body){
            if(err){return next(err);}
            if(response.statusCode === 404){
                res.render('error');
            }
            res.render('Clientes',{
                title:'Clientes',
                cliente: JSON.parse(body)
            });
            return;
        });
    };
    var renderInsertClientes = function(req, res, next){
        res.render('insertCliente',{
            title:'Insertar cliente'
        });
        return;
    };
    var insertClientes = function(req, res, next){
        var path = apiOptions.server + '/api/insertClientes';
        var requestOptions = {
            url: path,
            method: 'POST',
            json:req.body
        };
        req.checkBody('email', 'el campo email es requerido').notEmpty();
        req.checkBody('password','el campo contraseña es requerido').notEmpty();
        req.checkBody('nombre', 'el campo nombre es requerido').notEmpty();
        req.checkBody('tarjeta', 'el campo tarjeta es requerido').notEmpty();
        req.checkBody('credito', 'el campo limite es requerido').notEmpty();
        req.checkBody('estado', 'el campo estado es requerido').notEmpty();

        var errors = req.validationErrors();
        if(errors){
            res.render('insertCliente', {
                title: 'Insertar cliente',
                errors: errors
            });
            return;
        }else{
            Cliente.findOne({email: req.body.email})
                    .exec((err, cliente)=>{
                        if(err){return next(err);}
                        if(cliente){
                            var error = new Error('El cliente ya existe');
                            res.render('insertCliente', {
                                title: 'Insertar cliente',
                                error: error
                            });
                            return;
                        }
                        request(requestOptions, function (err, response, body) {
                            if (err) { return next(err); }
                            if (response.statusCode === 404) {
                                res.render('error');
                            }
                            res.redirect('/Clientes');
                            return;
                        });
                    });
        }
    };

    var renderEditClientes = function(req, res, next){
        res.render('editCliente',{
            title:'Editar cliente'
        });
        return;
    };
    var editClientes = function(req, res, next){
        var clienteId = req.params.clienteId;
        var path = apiOptions.server+'/api/editClientes/'+clienteId;
        var requestOptions = {
            url: path,
            method:'PUT',
            json: req.body
        };
        req.checkBody('nombre', 'el campo nombre es requerido').notEmpty();
        req.checkBody('tarjeta', 'el campo tarjeta es requerido').notEmpty();
        req.checkBody('credito', 'el campo limite es requerido').notEmpty();
        req.checkBody('estado', 'el campo estado es requerido').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.render('editCliente', {
                title: 'Editar cliente',
                errors: errors
            });
            return;
        }
        else{
            request(requestOptions, function (err, response, body) {
                if (err) { return next(err); }
                if (response.statusCode === 404) {
                    res.render('error');
                }
                res.redirect('/Clientes');
                return;
            });
        }
    };
    return {
        renderClientes: renderClientes,
        renderInsertClientes: renderInsertClientes,
        insertClientes: insertClientes,
        renderEditClientes: renderEditClientes,
        editClientes: editClientes
    };
})();

module.exports = Ctrl;