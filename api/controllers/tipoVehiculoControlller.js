var mongoose = require('mongoose');
var TipoVehiculo = mongoose.model('TipoVehiculo');
var Estado = mongoose.model('Estado');
var Ctrl = (function(){
    var getAllTipoVehiculos = function (req, res, next) {
        TipoVehiculo.find({ estado: 'Activo' })
            .exec(function (error, tipoVehiculos) {
                if (error) { return next(error); }
                if (req.status == 401) {
                    res.json({
                        message: "Unauthorized"
                    });
                }
                res.json(tipoVehiculos);
            });
    };
    var getInsertTipoVehiculo = function(req, res, next){
        var dependencies = {
            estado: []
        };
        Estado.find({estado:['Activo','Inactivo']})
                .select("estado")
              .exec(function(err,estado){
                  if(err){return next(err);}
                  dependencies.estado = estado;
                  res.json(dependencies);
              });
    };
    var insertNewTipoVehiculo = function(req,res, next){
            var tv = new TipoVehiculo({
                descripcion:req.body.descripcion,
                estado:req.body.estado
            });
            tv.save(function(err){
                if(err){return next(err);}
                console.log(tv);
            });
            Estado.findOne({estado: tv.estado})
                    .exec(function(err,estado){
                        estado.tipoVehiculo.push(tv);
                        estado.save(function(err){
                            if(err){return next(err);}
                            console.log(estado);
                        });
                        res.json(req.statusCode);
                    });
    };
    var getEditTipoVehiculo = function(req, res, next){
        var tpId = req.params.tipoVehiculoId;
        var dependencies = {
            estado: [],
            tipoVehiculo:{}
        };
        TipoVehiculo.findById(tpId)
                    .exec(function(err, tv){
                        if(err){return next(err);}
                        dependencies.tipoVehiculo = tv;
                    });
        Estado.find({estado:['Activo','Inactivo']})
            .select("estado")
            .exec(function (err, estado) {
                if (err) { return next(err); }
                dependencies.estado = estado;
                res.json(dependencies);
            });
        
    };
    var editTipoVehiculo = function(req, res, next){
        var tvId = req.params.tipoVehiculoId;
            TipoVehiculo.findById(tvId)
                        .exec(function(err, tv){
                            if(err){return next(err);}
                            tv.descripcion = req.body.descripcion;
                            tv.estado = req.body.estado;
                            tv.save(function(err){
                                if(err){return next(err);}
                                console.log(tv);
                            });
                            Estado.findOneAndUpdate({estado: tv.estado,"tipoVehiculo._id":tv._id},
                            {
                                "$set":{
                                    "tipoVehiculo.$":tv
                                }
                            })
                            .exec(function(err, estado){
                                if(err){return next(err);}
                                console.log(estado);
                                req.statusCode = 200;
                                res.json({
                                    statusCode:req.statusCode
                                });
                            });
                        });
    };
    return {
        getAllTipoVehiculos:getAllTipoVehiculos,
        getInsertTipoVehiculo: getInsertTipoVehiculo,
        insertNewTipoVehiculo: insertNewTipoVehiculo,
        getEditTipoVehiculo: getEditTipoVehiculo,
        editTipoVehiculo: editTipoVehiculo
    };
})();

module.exports = Ctrl;