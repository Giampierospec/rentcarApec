var mongoose = require('mongoose');
var Modelo = mongoose.model('ModeloCarro');
var Marca = mongoose.model('MarcaVehiculos');
var Estado = mongoose.model('Estado');

var Ctrl = (function(){
var getModelos = function(req, res, next){
    Modelo.find({estado:'Activo'})
          .exec(function(err, modelo){
            if(err){return next(err);}
             res.json(modelo);
             return;
          });
};
var getInsertModelo = function(req, res, next){
    var dependencies = {
        estados:[],
        marcas:[]
    };
    Marca.find({estado:'Activo'})
        .exec(function(err, marca){
            if(err){return next(err);}
            dependencies.marcas = marca;
        });
    Estado.find({estado:['Activo','Inactivo']})
          .select('estado')
          .exec(function(err, estados){
            if(err){return next(err);}
            dependencies.estados = estados;
            res.json(dependencies);
            return;
          });
};

var insertModelo = function(req, res, next){
    var modelo = new Modelo({
        descripcion: req.body.descripcion,
        marca: req.body.marca,
        estado: req.body.estado
    });
    modelo.save(function(err){
        if(err){return next(err);}
        console.log(modelo);
    });
    Marca.findOne({descripcion:modelo.marca})
        .exec(function(err, marca){
            marca.modelo.push(modelo);
            marca.save(function(err){
                if(err){return next(err);}
                console.log(marca);
            });
            
        });
    Estado.findOne({estado:modelo.estado})
            .exec(function(err, estado){
                estado.modeloVehiculo.push(modelo);
                estado.save(function(err){
                    if(err){return next(err);}
                });
                res.json(modelo);
                
            });
    
};

var getEditModelo = function(req, res, next){
    var modeloId = req.params.modeloId;
    var dependencies = {
        estados: [],
        marcas: [],
        modelo: {}
    };
    Modelo.findById(modeloId)
          .exec(function(err, modelo){
              if(err){return next(err);}
                dependencies.modelo = modelo;
          });
    Marca.find({ estado: 'Activo' })
        .exec(function (err, marca) {
            if (err) { return next(err); }
            dependencies.marcas = marca;
        });
    Estado.find({ estado: ['Activo', 'Inactivo'] })
        .select('estado')
        .exec(function (err, estados) {
            if (err) { return next(err); }
            dependencies.estados = estados;
            res.json(dependencies);
            return;
        });
};
var editModelo = function(req, res, next){
    var modeloId = req.params.modeloId;
    Modelo.findById(modeloId)
          .exec(function(err,modelo){
            if(err){return next(err);}
            modelo.descripcion = req.body.descripcion;
            modelo.marca = req.body.marca;
            modelo.estado = req.body.estado;
            modelo.save(function(err){
                if(err){return next(err);}
            });
            Marca.findOne({descripcion:modelo.marca})
                    .exec(function(err,marca){
                        marca.modelo.id(modeloId).remove();
                        marca.modelo.push(modelo);
                        marca.save(function(err){
                            if(err){return next(err);}
                        });
                    });
            Estado.findOne({estado:modelo.estado})
                  .exec(function(err,estado){
                      estado.modeloVehiculo.id(modeloId).remove();
                      estado.modeloVehiculo.push(modelo);
                      estado.save(function(){
                          if(err){return next(err);}
                      });
                      res.json({
                          modelo:estado
                      });
                  });
          });
};
return {
    getInsertModelo:getInsertModelo,
    insertModelo: insertModelo,
    getEditModelo: getEditModelo,
    editModelo: editModelo,
    getModelos: getModelos
};
})();


module.exports = Ctrl;