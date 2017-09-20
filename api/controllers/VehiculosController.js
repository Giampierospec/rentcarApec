var mongoose = require('mongoose');
var Vehiculo = mongoose.model('Vehiculo');
var TipoVehiculo = mongoose.model('TipoVehiculo');
var Marca = mongoose.model('MarcaVehiculos');
var Modelo = mongoose.model('ModeloCarro');
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
            estados:[],
            tipoVehiculo:[]

        };
        Marca.find({},function(err, marca){
            if(err){return next(err);}
            dependencies.marcas = marca;
        });
        TipoCombustible.find({}, function(err, tc){
            if (err) { return next(err); }
            dependencies.tipoCombustibles = tc;
        });
        TipoVehiculo.find({}, function (err, tv) {
            if(err){return next(err);}
            dependencies.tipoVehiculo = tv;
        });
        Estado.find({},function(err, estado){
            if (err) { return next(err); }
            dependencies.estados = estado;
            res.json(dependencies);
        });
        
        
        
    };
    var insertNewVehiculo = function(req, res, next){
            var vehiculo = new Vehiculo({
                descripcion: req.body.descripcion,
                noChasis: req.body.noChasis,
                noMotor: req.body.noMotor,
                noPlaca: req.body.noPlaca,
                tipoVehiculo: req.body.tipoVehiculo,
                marca: req.body.marcaDesc,
                modelo: req.body.modelo,
                tipoCombustible: req.body.tipoCombustible,
                estado: req.body.estado,
            });
            vehiculo.save(function (err) {
                if (err) { return next(err); }
                console.log(vehiculo);
            });
            TipoVehiculo.findOne({descripcion:vehiculo.tipoVehiculo}, function(err, tv){
                tv.vehiculo.push(vehiculo);
                tv.save(function(err){
                    if(err){return next(err);}
                    console.log(tv);
                });
            });
            Marca.findOne({descripcion:vehiculo.marca}, function(err, marca){
                marca.vehiculo.push(vehiculo);
                marca.save(function(err){
                    if(err){return next(err);}
                    console.log(marca);
                });
            });
            Modelo.findOne({descripcion:vehiculo.modelo}, function(err, modelo){
                    modelo.vehiculo.push(vehiculo);
                    modelo.save(function(err){
                        if(err){return next(err);}
                        console.log(modelo);
                    });
            });
            TipoCombustible.findOne({ descripcion: vehiculo.tipoCombustible }, function (err, tc) {
                tc.vehiculo.push(vehiculo);
                tc.save(function (err) {
                    if (err) { return next(err); }
                    console.log(tc);
                });
            });
            Estado.findOne({ estado: vehiculo.estado }, function (err, estado) {
                estado.vehiculo.push(vehiculo);
                estado.save(function (err) {
                    if (err) { return next(err); }
                    console.log(estado);
                });
                return res.json({
                    message:req.statusCode,
                    vehiculo: vehiculo
                });
            });    
    };

    return {
        getAllVehiculos :getAllVehiculos,
        getAllTipoVehiculos: getAllTipoVehiculos,
        insertVehiculos: insertVehiculos,
        insertNewVehiculo: insertNewVehiculo
    };
})();






module.exports = Ctrl;