var mongoose = require('mongoose');
var Estado = mongoose.model('Estado');
var Marca = mongoose.model('MarcaVehiculos');

var Ctrl = (function(){
    var getMarcasActivas = function(req, res, next){
        Marca.find({estado:'Activo'})
            .exec(function(err, marca){
                if(err){return next(err);}
                res.json(marca);
            });
    };
    var getInsertMarca = function (req, res, next) {
        var dependencies = {
            estado: []
        };
        Estado.find({estado:['Activo','Inactivo']})
            .select("estado")
            .exec(function (err, estado) {
                if (err) { return next(err); }
                dependencies.estado = estado;
                res.json(dependencies);
            });
    };
    var insertMarca = function(req, res, next){
        var marca = new Marca({
            descripcion:req.body.descripcion,
            estado: req.body.estado
        });
        marca.save(function(err){
            if(err){
                return next(err);
            }
        });
        Estado.findOne({ estado: marca.estado })
                .exec(function(err, estado){
                    if(err){return next(err);}
                    estado.marcaVehiculo.push(marca);
                    estado.save(function(err){
                        if(err){return next(err);}
                        req.statusCode = 201;
                        res.json({
                            status: req.statusCode
                        });
                    });
                });
    };
    var getEditMarca = function(req, res, next){
        var marcaId = req.params.marcaId;
        var dependencies = {
            marca: {},
            estados:[]
        };
        Marca.findById(marcaId)
            .exec(function(err, marca){
                if(err){return next(err);}
                dependencies.marca = marca;
            });
        Estado.find({estado:['Activo','Inactivo']})
            .select("estado")
            .exec(function (err, estado) {
                if (err) { return next(err); }
                dependencies.estado = estado;
                res.json(dependencies);
            });
        
    };
    var editMarca = function(req, res, next){
        var marcaId = req.params.marcaId;
        Marca.findById(marcaId)
            .exec(function(err,marca){
                marca.descripcion = req.body.descripcion;
                marca.estado = req.body.estado;
                marca.save(function(err){
                    if(err){return next(err);}
                    console.log(marca);
                });
                Estado.findOneAndUpdate({estado:marca.estado,"marcaVehiculo._id":marca._id},{
                    "$set":{
                        "marcaVehiculo.$":marca
                    }
                })
                .exec(function(err,estado){
                    if(err){return next(err);}
                    req.statusCode = 200;
                    res.json({
                        statusCode: req.statusCode
                    });
                });
            });
    };
    return {
        getMarcasActivas: getMarcasActivas,
        getInsertMarca:getInsertMarca,
        insertMarca: insertMarca, 
        getEditMarca: getEditMarca,
        editMarca: editMarca
    };
})();

module.exports = Ctrl;