var request = require('request');
var apiOptions = require('../utils/serverLocation');
var TipoVehiculo = require('../models/TipoVehiculo').model;
var Ctrl = (function(){
    var getTipoVehiculos = function(req, res, next){
        var url = apiOptions.server+'/api/getAllTipoVehiculos';
        var requestOptions = {
            url: url,
            method:'GET'
        };
        request(requestOptions,function(err, response, body){
            console.log(body);
            if(err){return next(err);}
            if(response.statusCode === '404'){
                var error = new Error('Not Found');
                return next(error);
            }
            return res.render('tipoVehiculo',{
                title:'Tipo Vehiculo',
                tv: JSON.parse(body)
            });
        });
    };
    var renderInsertTipoVehiculos = function(req,res, next){
        res.render('insertTipoVehiculo',{
            title:'Insertar tipo de vehiculo'
        });

    };
    var InsertTipoVehiculo = function(req, res, next){
        var path = apiOptions.server +'/api/InsertTipoVehiculo/';
        var requestOptions = {
            url: path,
            method:'POST',
            json: req.body
        };
        TipoVehiculo.findOne({descripcion:req.body.descripcion})
                    .exec(function(err, tv){
                        if(tv !== null || tv !== undefined){
                                var error = new Error("El tipo de vehiculo ya existe");
                                res.render('insertTipoVehiculo',{
                                    title: 'Insertar tipo de vehiculo',
                                    error: error.message
                                });
                                return;
                        }
                        if(err){return next(err);}
                        request(requestOptions,function(err,response,body){
                            if(err){return next(err);}
                            if(response.statusCode === 404){
                                return next(err);
                            }
                            res.redirect('/tipoVehiculos');
                        });
                    });
    };
    return {
        getTipoVehiculos: getTipoVehiculos,
        renderInsertTipoVehiculos: renderInsertTipoVehiculos,
        insertTipoVehiculo: InsertTipoVehiculo
    };

})();

module.exports = Ctrl;