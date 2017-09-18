var mongoose = require('mongoose');
var Vehiculo = mongoose.model('Vehiculo');
var TipoVehiculo = mongoose.model('TipoVehiculo');
var Marca = mongoose.model('MarcaVehiculos');
var TipoCombustible = mongoose.model('TipoCombustible');
var Estado = mongoose.model('Estado');
var Ctrl = (function(){

    var getAllVehiculos = function(req, res, next){
        Vehiculo.find({estado:'Activo'}, function(error,vehiculos){
            if(error){return next(error);}
            if(req.status == 401){
                res.json({
                    message:"Unauthorized"
                });
            }
            res.json(vehiculos);
        });
    };
    var getAllTipoVehiculos = function(req, res, next){
        TipoVehiculo.find({estado:'Activo'}, function(error, tipoVehiculos){
            if(err){return next(error);}
            if (req.status == 401) {
                res.json({
                    message: "Unauthorized"
                });
            }
            res.json(tipoVehiculos);
        });
    };
    var insertVehiculos = function(req, res, next){
        var dependencies = {
            marcas:[],
            tipoCombustibles:[],
            estados:[]

        };
        Marca.find({},function(err, marca){
            if(err){return next(err);}
            dependencies.marcas = marca;
        });
        TipoCombustible.find({}, function(err, tc){
            if (err) { return next(err); }
            dependencies.tipoCombustibles = tc;
        });
        Estado.find({},function(err, estado){
            if (err) { return next(err); }
            dependencies.estados = estado;
            res.json(dependencies);
        });
        
    };
    return {
        getAllVehiculos :getAllVehiculos,
        getAllTipoVehiculos: getAllTipoVehiculos,
        insertVehiculos: insertVehiculos
    };
})();






module.exports = Ctrl;