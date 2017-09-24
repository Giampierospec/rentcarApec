var Modelo = require('../models/ModelosCarro').model;

var request = require('request');

var apiOptions = require('../utils/serverLocation');

var Ctrl =(function(){
    var renderModelos = function(req,res,next){
        var path = apiOptions.server+'/api/modelos';
        var requestOptions={
            url: path,
            method:'GET'
        };
        request(requestOptions, function(err, response,body){
            if(err){return next(err);}
            if(response.statusCode === 404){
                res.render('error');
            }
            res.render('Modelos',{
                title:'Modelos',
                data: JSON.parse(body)
            });
            return;
        });
    };
    var renderInsert = function(req, res, next){
        res.render('insertModelo',{
            title:'Insertar modelo'
        });
        return;
    };
    var insertModelo = function(req, res, next){
        var path = apiOptions.server+'/api/insertModelo';
        var requestOptions = {
            url: path,
            method:'POST',
            json: req.body
        };
        req.checkBody('descripcion','El campo descripcion es requerido').notEmpty();
        req.checkBody('marca','El campo marca es requerido').notEmpty();
        req.checkBody('estado', 'El campo estado es requerido').notEmpty();

        var errors = req.validationErrors();
        if(errors){
            res.render('insertModelo', {
                title: 'Insertar modelo',
                errors: errors
            });
            return;
        }else{
            Modelo.findOne({descripcion:req.body.descripcion})
                    .exec(function(err, modelo){
                        if(err){return next(err);}
                        if(modelo){
                            var error = new Error('El modelo ya existe');
                            res.render('insertModelo', {
                                title: 'Insertar modelo',
                                error: error
                            });
                            return;
                        }
                        request(requestOptions, function(err, response,body){
                            if(err){return next(err);}
                            if(response.statusCode === 404){
                                res.render('error');
                                return;
                            }
                            res.redirect('/modeloVehiculo');
                            return;
                        });
                    });
        }
    };
    var renderEditModelo = function(req, res, next){
        res.render('editModelo',{
            title:'Editar modelo'
        });
        return;
    };
    var editModelo = function(req, res, next){
        var modeloId = req.params.modeloId;
        var path = apiOptions.server +'/api/editModelo/'+modeloId;
        var requestOptions = {
            url: path,
            method:'PUT',
            json: req.body
        };
        req.checkBody('descripcion', 'El campo descripcion es requerido').notEmpty();
        req.checkBody('marca', 'El campo marca es requerido').notEmpty();
        req.checkBody('estado', 'El campo estado es requerido').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.render('editModelo', {
                title: 'Editar modelo',
                errors: errors
            });
            return;
        }
        else{
            request(requestOptions,function(err, response,body){
                if(err){return next(err);}
                if(response.statusCode === 404){
                    res.render('error');
                }
                res.redirect('/ModeloVehiculo');
                return;
            });
        }

    };
    return {
        renderModelos: renderModelos,
        renderInsert: renderInsert,
        insertModelo: insertModelo,
        renderEditModelo: renderEditModelo,
        editModelo: editModelo
    };
})();
module.exports = Ctrl;