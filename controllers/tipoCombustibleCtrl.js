var tipoCombustible = require('../models/TipoCombustible').model;
var request = require('request');
var apiOptions = require('../utils/serverLocation');

var Ctrl = (function(){
    var renderTipoCombustible = function(req, res, next){
        var path = apiOptions.server +'/api/tipoCombustible';
        var requestOptions = {
            url: path,
            method:'GET'
        };
        request(requestOptions, function(err, response, body){
            if(err){return next(err);}
            if(response.statusCode === 404){
                res.render('error');
            }
            res.render('tipoCombustible',{
                title:'Tipo Combustible',
                tc: JSON.parse(body)
            });
            return;
        });
    };
    var renderInsertCombustible = function(req, res, next){
        res.render('insertTipoCombustible',{
            title:'Insertar combustible'
        });
    };

    var insertTipoCombustible = function(req, res, next){
        var path = apiOptions.server +'/api/insertTipoCombustible';
        var requestOptions = {
            url: path,
            method:'POST',
            json: req.body
        };
        req.checkBody('descripcion', 'El campo descripcion es requerido').notEmpty();
        req.checkBody('estado','El campo estado es requerido').notEmpty();

        var errors = req.validationErrors();
        if(errors){
            res.render('insertTipoCombustible', {
                title: 'Insertar combustible',
                errors: errors
            });
            return;
        }
        else{
            TipoCombustible.findOne({descripcion: req.body.descripcion})
                            .exec(function(err, tc){
                                if(err){return next(err);}
                                if(tc){
                                    var error = new Error('El tipo de combustible ya existe');
                                    res.render('insertTipoCombustible', {
                                        title: 'Insertar combustible',
                                        error: error
                                    });
                                    return;
                                }
                                request(requestOptions,function(err, response, body){
                                    if(err){return next(err);}
                                    if(response.statusCode === 404){
                                        res.render('error');
                                    }
                                    res.redirect('/tipoCombustible');
                                    return;
                                });
                            });
        }
    };
    var renderEditCombustible = function(req, res, next){
        res.render('editTipoCombustible',{
            title:'Editar tipo combustible'
        });
    
    };
    var editCombustible = function (req, res, next) {
        var tcId = req.params.tcId;
        var path = apiOptions.server + '/api/editTC/' + tcId;
        var requestOptions = {
            url: path,
            method: 'PUT',
            json: req.body
        };
        req.checkBody('descripcion', 'El campo descripcion es requerido').notEmpty();
        req.checkBody('estado', 'El campo estado es requerido').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.render('editTipoCombustible', {
                title: 'Editar tipo combustible',
                errors: errors
            });
            return;
        }
        else {
            request(requestOptions, function (err, response, body) {
                if (err) { return next(err); }
                if (response.statusCode === 404) {
                    res.render('error');
                }
                res.redirect('/tipoCombustible');
            });
        }
    };
    return {
        renderTipoCombustible: renderTipoCombustible,
        renderInsertCombustible: renderInsertCombustible,
        insertTipoCombustible: insertTipoCombustible,
        renderEditCombustible: renderEditCombustible,
        editTipoCombustible:editCombustible
    };
})();

module.exports = Ctrl;