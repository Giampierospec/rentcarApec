var Marca = require('../models/MarcaVehiculos').model;
var apiOptions = require('../utils/serverLocation');
var request = require('request');
var Ctrl = (function(){
    var getAllMarcas = function(req,res,next){
        var path = apiOptions.server +'/api/marcas';
        var requestOptions = {
            url: path,
            method:'GET'
        };
        request(requestOptions,function(err,response,body){
            if(err){return next(err);}
            if(response.statusCode === 404){
                res.render(error);
            }
            res.render('marcas',{
                title:'Marcas',
                marcas: JSON.parse(body)
            });
        });
    };
    var renderInsertMarca = function(req, res, next){
       res.render('insertMarca',{
            title:'Insertar marca'
       });
    };
    var insertMarca = function(req, res, next){
        var path = apiOptions.server+'/api/InsertMarca';
        var requestOptions = {
            url: path,
            method: 'POST',
            json: req.body
        };
        req.checkBody('descripcion', 'El campo descripcion es requerido').notEmpty();
        req.checkBody('estado', 'El campo estado es requerido').notEmpty();

        var errors = req.validationErrors();
        if(errors){
            res.render('insertMarca', {
                title: 'Insertar marca',
                errors: errors
            });
            return;
        }
        else{
            Marca.findOne({descripcion:req.body.descripcion})
                .exec(function (err, marca) {
                    if (err) { return next(err); }
                    if(marca){
                        var error = new Error('La marca ya existe intente denuevo');
                        res.render('insertMarca', {
                            title: 'Insertar marca',
                            error: error
                        });
                        return;
                    }
                    request(requestOptions,function(err, response, body){
                        if(err){
                            return next(err);
                        }
                        if(response.statusCode === 404){
                            res.render('error');
                        }
                        res.redirect('/marcaVehiculo');
                    });
                    
                });
        }

    };

    var renderEditMarca = function(req,res, next){
        res.render('editMarca',{
            title:'Editar Marca'
        });
    };
    var editMarca = function(req, res, next){
        var marcaId = req.params.marcaId;
        var path = apiOptions.server+'/api/editMarca/'+marcaId;

        var requestOptions = {
            url:path,
            method:'PUT',
            json: req.body
        };
        req.checkBody('descripcion', 'El campo descripcion es requerido').notEmpty();
        req.checkBody('estado', 'El campo estado es requerido').notEmpty();

        var errors = req.validationErrors();
        if (errors) {
            res.render('editMarca', {
                title: 'Editar Marca',
                errors: errors
            });
            return;
        } 
        else{
            request(requestOptions, function(err, response, body){
                if(err){return next(err);}
                if(response.statusCode === 404){
                    res.render('error');
                }
                res.redirect('/marcaVehiculo');
            });
        }

    };
return {
    getAllMarcas: getAllMarcas,
    renderInsertMarca: renderInsertMarca,
    insertMarca: insertMarca,
    renderEditMarca: renderEditMarca,
    editMarca: editMarca
};
})();

module.exports = Ctrl;