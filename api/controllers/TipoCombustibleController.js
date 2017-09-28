var mongoose = require('mongoose');
var TipoCombustible = mongoose.model('TipoCombustible');
var Estado = mongoose.model('Estado');
var Vehiculo = mongoose.model('Vehiculo');
var Ctrl = (function(){
    var getTipoCombustibles = function(req, res, next){
        TipoCombustible.find({estado:'Activo'})
                        .exec(function(err, tc){
                            if(err){return next(err);}
                            res.json(tc);
                            return;
                        });

    };
    var getInsertTipoCombustible = function(req, res, next){
        var dependencies = {
            estados:[]
        };
        Estado.find({estado:['Activo','Inactivo']})
                .exec(function(err, estado){
                    if(err){return next(err);}
                    dependencies.estados = estado;
                    res.json(dependencies);
                    return;
                });
    };

    var insertTipoCombustible = function(req, res, next){
        var tipoCombustible = new TipoCombustible({
            descripcion: req.body.descripcion,
            estado: req.body.estado
        });
        tipoCombustible.save(function(err){
            if(err){return next(err);}
            console.log(tipoCombustible);
        });
        Estado.findOne({estado:tipoCombustible.estado})
            .exec(function(err, estado){
                if(err){
                return next(error);
                }
                estado.tipoCombustible.push(tipoCombustible);
                res.json();
                return;
            });
    };

    var getEditTipoCombustible = function(req, res, next){
        var tcId = req.params.tcId;
        var dependencies = {
            estados:[],
            tipoCombustible:{}
        };
        TipoCombustible.findById(tcId)
                        .exec(function(err,tc){
                            if(err){return next(err);}
                            dependencies.tipoCombustible = tc;
                        });
        Estado.find({ estado: ['Activo', 'Inactivo'] })
            .exec(function (err, estado) {
                if (err) { return next(err); }
                dependencies.estados = estado;
                res.json(dependencies);
                return;
            });
        
    };

    var editTipoCombustible = function(req, res, next){
        var tcId = req.params.tcId;
        TipoCombustible.findById(tcId)
            .exec(function (err, tc) {
                if (err) { return next(err); }
                Vehiculo.find({ tipoCombustible: tc.descripcion })
                    .exec(function (err, vehiculos) {
                        if (vehiculos.length > 0) {
                            vehiculos.forEach(function (vh) {
                                if (req.body.estado === 'Inactivo') {
                                    vh.tipoCombutstible = '';
                                }
                                else {
                                    vh.tipoCombustible = req.body.descripcion;
                                }
                                vh.save(function (err) {
                                    if (err) { return next(err); }
                                });
                            });

                        }
                    });
                tc.descripcion = req.body.descripcion;
                tc.estado = req.body.estado;
                tc.save(function(err){
                    if(err){return next(err);}
                });
                
                Estado.findOneAndUpdate({ estado: tc.estado ,'tipoCombustible._id':tc._id},
                {
                    '$set':{
                        'tipoCombustible.$':tc
                    }
                })
                    .exec(function (err, estado) {
                        if (err) { return next(err); }
                        if(!estado){
                            Estado.findOne({estado:tc.estado})
                                  .exec(function(err, estado){
                                    if(err){return next(err);}
                                    estado.tipoCombustible.push(tc);
                                    estado.save(function(err){
                                        if(err){return next(err);}
                                    });
                                  });
                        }
                        res.json();
                        return;
                    });
            });
    };
    return {
        getTipoCombustibles: getTipoCombustibles,
        getInsertTipoCombustible: getInsertTipoCombustible,
        insertTipoCombustible: insertTipoCombustible,
        getEditTipoCombustible:getEditTipoCombustible,
        editTipoCombustible: editTipoCombustible
    };
})();

module.exports = Ctrl;