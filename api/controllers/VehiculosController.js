var mongoose = require('mongoose');
var Vehiculo = mongoose.model('Vehiculo');
var TipoVehiculo = mongoose.model('TipoVehiculo');
var Marca = mongoose.model('MarcaVehiculos');
var Modelo = mongoose.model('ModeloCarro');
var TipoCombustible = mongoose.model('TipoCombustible');
var Estado = mongoose.model('Estado');

var getDependencies = function(){

};
var Ctrl = (function(){

    var getAllVehiculos = function(req, res, next){
        Vehiculo.find({estado:'Activo'})
        .exec(function(error,vehiculos){
            if(error){return next(error);}
            if(req.status == 401){
                res.json({
                    message:"Unauthorized"
                });
            }
            res.json(vehiculos);
        });
    };
    var getEditVehiculos = function(req, res, next){
        
        var dependencies = {
            vehiculo:{},
            marcas: [],
            tipoCombustibles: [],
            estados: [],
            tipoVehiculo: []

        };
        Vehiculo.findById(req.params.idVehiculo).exec(function(err, vehiculo){
            if (err) { return next(err); }
            dependencies.vehiculo = vehiculo; 
        });
        Marca.find({estado:'Activo'}).exec(function (err, marca) {
            if (err) { return next(err); }
            dependencies.marcas = marca;
        });
        TipoCombustible.find({estado:'Activo'}).exec(function (err, tc) {
            if (err) { return next(err); }
            dependencies.tipoCombustibles = tc;
        });
        TipoVehiculo.find({estado:'Activo'}).exec(function (err, tv) {
            if (err) { return next(err); }
            dependencies.tipoVehiculo = tv;
        });
        Estado.find({estado:'Activo'}).exec(function (err, estado) {
            if (err) { return next(err); }
            dependencies.estados = estado;
            res.json(dependencies);
        });
    };
    var editVehiculos = function(req, res, next){
        var vehiculoId = req.params.idVehiculo;
        Vehiculo.findOne({_id:vehiculoId})
                .exec(function(err,vehiculo){
                    if(err){return next(err);}
                    console.log(vehiculo);
                    
                        vehiculo.descripcion = req.body.descripcion;
                        vehiculo.noChasis = req.body.noChasis;
                        vehiculo.noMotor = req.body.noMotor;
                        vehiculo.noPlaca = req.body.noPlaca;
                        vehiculo.tipoVehiculo = req.body.tipoVehiculo;
                        vehiculo.marca = req.body.marcaDesc;
                        vehiculo.modelo = req.body.modelo;
                        vehiculo.tipoCombustible = req.body.tipoCombustible;
                        vehiculo.estado = req.body.estado;
                    
                    vehiculo.save(function(err){
                        if(err){return next(err);}
                        console.log("Vehiculo actualizado correctamente");
                    });
                    
                    TipoVehiculo.findOneAndUpdate({ descripcion: vehiculo.tipoVehiculo, "vehiculo._id": vehiculoId},
                    {
                        "$set":{
                            "vehiculo.$":vehiculo
                        }
                    })
                    .exec(function(err, tv){
                        if(err){return next(err);}
                        console.log(tv);
                    });

                    Marca.findOneAndUpdate({ descripcion: vehiculo.marca, "vehiculo._id": vehiculoId },
                        {
                            "$set": {
                                "vehiculo.$": vehiculo
                            }
                        })
                        .exec(function (err, mr) {
                            if (err) { return next(err); }
                            console.log(mr);
                        });
                    
                    Modelo.findOneAndUpdate({ descripcion: vehiculo.modelo, "vehiculo._id": vehiculoId},
                        {
                            "$set": {
                                "vehiculo.$": vehiculo
                            }
                        })
                        .exec(function (err, md) {
                            if (err) { return next(err); }
                            console.log(md);
                        });
                    TipoCombustible.findOneAndUpdate({ descripcion: vehiculo.tipoCombustible, "vehiculo._id": vehiculoId },
                        {
                            "$set": {
                                "vehiculo.$": vehiculo
                            }
                        })
                        .exec(function (err, tc) {
                            if (err) { return next(err); }
                            console.log(tc);
                        });
                    Estado.findOneAndUpdate({ estado: vehiculo.estado, "vehiculo._id": vehiculoId },
                        {
                            "$set": {
                                "vehiculo.$": vehiculo
                            }
                        })
                        .exec(function (err, estado) {
                            if (err) { return next(err); }
                            console.log(estado);
                            res.json({
                                message: "updated",
                                status: req.statusCode
                            });
                        });

                });
    };
    var insertVehiculos = function(req, res, next){
        var dependencies = {
            marcas:[],
            tipoCombustibles:[],
            estados:[],
            tipoVehiculo:[]

        };
        Marca.find({estado:'Activo'}).exec(function(err, marca){
            if(err){return next(err);}
            dependencies.marcas = marca;
        });
        TipoCombustible.find({estado:'Activo'}).exec(function(err, tc){
            if (err) { return next(err); }
            dependencies.tipoCombustibles = tc;
        });
        TipoVehiculo.find({estado:'Activo'}).exec(function (err, tv) {
            if(err){return next(err);}
            dependencies.tipoVehiculo = tv;
        });
        Estado.find({}).exec(function(err, estado){
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
            TipoVehiculo.findOne({descripcion:vehiculo.tipoVehiculo})
            .exec(function(err, tv){
                tv.vehiculo.push(vehiculo);
                tv.save(function(err){
                    if(err){return next(err);}
                    console.log(tv);
                });
            });
            Marca.findOne({descripcion:vehiculo.marca})
            .exec(function(err, marca){
                marca.vehiculo.push(vehiculo);
                marca.save(function(err){
                    if(err){return next(err);}
                    console.log(marca);
                });
            });
            Modelo.findOne({descripcion:vehiculo.modelo})
            .exec(function(err, modelo){
                    modelo.vehiculo.push(vehiculo);
                    modelo.save(function(err){
                        if(err){return next(err);}
                        console.log(modelo);
                    });
            });
            TipoCombustible.findOne({ descripcion: vehiculo.tipoCombustible })
            .exec(function (err, tc) {
                tc.vehiculo.push(vehiculo);
                tc.save(function (err) {
                    if (err) { return next(err); }
                    console.log(tc);
                });
            });
            Estado.findOne({ estado: vehiculo.estado })
            .exec(function (err, estado) {
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
        insertVehiculos: insertVehiculos,
        insertNewVehiculo: insertNewVehiculo,
        getEditVehiculos: getEditVehiculos,
        editVehiculos: editVehiculos
    };
})();






module.exports = Ctrl;