require(process.cwd()+'/Connection/dbConnection');
var async = require('async');
var mongoose = require('mongoose');
var Vehiculo = require("../models/Vehiculo").model;
var TipoVehiculo = require('../models/TipoVehiculo').model;
var ModeloCarro = require('../models/ModelosCarro').model;
var MarcaVehiculo = require('../models/MarcaVehiculos').model;
var TipoCombustible = require('../models/TipoCombustible').model;
var Estados = require('../models/Estado');

var data={
    estados:[
        {
           estado: "Activo"
        },
        {
            estado: "Inactivo"
        },
        {
            estado:'Rentado'
        },
        {
            estado: 'Devuelto'
        },
        {
            estado:'Inspeccion'
        }
    ],
    tipoVehiculo:[
        {
            descripcion:"Suv"
        },
        {
            descripcion:"Mini van"
        }
    ],
    marcaVehiculo:[
        {
            descripcion:"Toyota",
        },
        {
            descripcion:"Ferrari"
        }

    ],
    modeloVehiculo:[
        {
            descripcion:"Enzo Ferrari"
        },
        {
            descripcion:"Camry"
        }

    ],
    tipoCombustible:[
        {
            descripcion: "Diesel"
        }
    ],
    vehiculo:[
        {
            descripcion:"Rojo",
            noChasis:Math.floor(Math.random() * 10000),
            noMotor: Math.floor(Math.random() * 10000),
            noPlaca: Math.floor(Math.random() * 10000)

        }

    ]
    
};
var removeEstados = function(callback){
    Estados.remove({}, function(err, result){
        if(err){console.error('error: '+err);}
        
        callback();
    });
};
var removeTipoVehiculos = function(callback){
    TipoVehiculo.remove({},function(err, result){
        if (err) { console.error('error: ' + err); }
        callback();
    });
};

var removeMarcaVehiculos = function(callback){
    MarcaVehiculo.remove({}, function (err, result) {
        if (err) { console.error('error: ' + err); }
        callback();
    });
};

var removeTipoCombustibles = function(callback){
    TipoCombustible.remove({}, function (err, result) {
        if (err) { console.error('error: ' + err); }
        callback();
    });
};

var removeModeloCarros = function(callback){
    ModeloCarro.remove({}, function (err, result) {
        if (err) { console.error('error: ' + err); }
        callback();
    });
};

var removeVehiculos = function(callback){
    Vehiculo.remove({}, function (err, result) {
        if (err) { console.error('error: ' + err); }
        callback();
    });
};

var addEstados = function(callback){
    Estados.create(data.estados,function(err, result){
        if(err){
            console.error('Error insertando estados');
        }
        console.log('Estados añadidos de manera correcta');
        callback();
    });
};
var addVehiculos = function(callback){
    Vehiculo.create(data.vehiculo, function(err, vehiculo){
        if(err){
            console.error("No se pudieron insertar los vehiculos");
        }
        callback();
    });
};
var addTipoVehiculo = function(callback){
    TipoVehiculo.create(data.tipoVehiculo, function(err, tipovehiculo){
        if (err) {
            console.error('Error insertando Tipo de Vehiculos');
        }
        
        console.log('Tipo de vehiculos añadidos de manera correcta');
        callback();
    });
    
};
var addModeloVehiculo = function(callback){
    ModeloCarro.create(data.modeloVehiculo, function(err, modelo){
        if(err){
            return console.error('Error insertando modelo de carro');
        }
        console.log('Marca de vehiculos añadida satisfactoriamente');
        callback();
    });
};
var addTipoCombustible = function(callback){
    TipoCombustible.create(data.tipoCombustible, function(err, modelo){
        if (err) { return console.error(err); }
        console.log("tipo de combustible añadido correctamente");
        callback();
    });
    
};
var updateTipoVehiculo = function(callback){
    TipoVehiculo.findOne({ descripcion: 'Suv' }, function (err, tipovehiculo) {
        console.log(tipovehiculo);
    
        Estados.findOne({ estado: 'Activo' }, function (err, estado) {
            if (err) { return console.error(err); }
            tipovehiculo.estado = estado.estado;
            estado.tipoVehiculo.push(tipovehiculo);
            estado.save(function(err){
                if(err){return console.error(err);}
                console.log(estado);
            });
            tipovehiculo.save(function(err){
                if(err){return console.error(err);}
                console.log(tipovehiculo);
            });
            callback();
        });
       
        
    });
    
};
var addMarcaVehiculo = function(callback){
MarcaVehiculo.create(data.marcaVehiculo, function(err, marca){
    if(err){return console.error(err);}
    console.log('Marcas vehiculo creadas correctamente ',marca);
    callback();    
});
};
var updateTipoCombustible = function(callback){
    TipoCombustible.findOne({descripcion:"Diesel"},function(err, tc){
        Estados.findOne({estado:'Activo'}, function(err, estado){
            tc.estado = estado.estado;
            estado.tipoCombustible.push(tc);
            estado.save(function(err){
                if(err){return console.error(err);}
                console.log(estado);
            });
            tc.save(function(err){
                if(err){return console.error(err);}
                console.log(tc);
            });
            
        });
    });
};
var updateMarcaVehiculo = function (callback){
    MarcaVehiculo.findOne({descripcion:'Toyota'}, function(err, marca){
        if(err){return console.error(err);}
        Estados.findOne({estado:'Activo'}, function(err, estado){
            marca.estado = estado.estado;
            estado.marcaVehiculo.push(marca);
            estado.save(function(err){
                if(err){return console.error(err);}
                console.log(estado);
            });
          marca.save(function(err){
            if(err){return console.error(err);}
              console.log(marca);
          });
            callback();
        });
         
    });
       
};

var updateVehiculoOnEstado = function(callback){
    Vehiculo.findOne({descripcion:"Rojo"}, function(err, vehiculo){

        Estados.findOne({estado: 'Activo'}, function(err, estado){
            if (err) { return console.error(err); }
            vehiculo.estado = estado.estado;
            estado.vehiculo.push(vehiculo);
            estado.save(function (err) {
                if (err) { return console.error(err); }
                console.log(estado);
            });
            vehiculo.save(function(err){
                if(err){return console.error(err);}
                console.log(vehiculo);
            });
            callback();
        });
    });
};
var updateVehiculoOnTipo = function(callback){
    Vehiculo.findOne({descripcion:'Rojo'}, function(err, vehiculo){
        TipoVehiculo.findOne({ descripcion: 'Suv' }, function (err, tv) {
            if (err) { return console.error(err); }
            vehiculo.tipoVehiculo = tv.descripcion;
            tv.vehiculo.push(vehiculo);
            tv.save(function (err) {
                if (err) { return console.error(err); }
                console.log(tv);
            });

            vehiculo.save(function (err) {
                if (err) { return console.error(err); }
                console.log(vehiculo);
            });
            callback();
        });
    });
};
var updateModeloOnEstado = function(callback){
    ModeloCarro.findOne({descripcion:'Camry'}, function(err, modelo){
        Estados.findOne({estado:'Activo'},function(err, estado){
            modelo.estado = estado.estado;
            estado.modeloVehiculo.push(modelo);
            estado.save(function(err){
                if(err){return console.log(err);}
                console.log(estado);
            });
            modelo.save(function(err){
                if(err){return console.error(err);}
                console.log(modelo);
            });
            callback();
        });
    });
};
var updateModeloOnMarca = function (callback) {
    ModeloCarro.findOne({ descripcion: 'Camry' }, function (err, modelo) {
        MarcaVehiculo.findOne({ descripcion: 'Toyota' }, function (err, marca) {
            modelo.marca = marca.descripcion;
            marca.modelo.push(modelo);
            marca.save(function (err) {
                if (err) { return console.log(err); }
                console.log(marca);
            });
            modelo.save(function (err) {
                if (err) { return console.error(err); }
                console.log(modelo);
            });
            callback();
        });
    });
};
var updateVehiculoOnMarca = function(callback){
    Vehiculo.findOne({ descripcion: 'Rojo' }, function (err, vehiculo) {
        MarcaVehiculo.findOne({ descripcion: 'Toyota' }, function (err, marca) {
            if (err) { return console.error(err); }
            vehiculo.marca = marca.descripcion;
            vehiculo.modelo = marca.modelo[0].descripcion;
            marca.vehiculo.push(vehiculo);
            marca.save(function (err) {
                if (err) { return console.error(err); }
                console.log(marca);
            });

            vehiculo.save(function (err) {
                if (err) { return console.error(err); }
                console.log(vehiculo);
            });
            callback();
        });
    });
};
var updateVehiculoOnTipoCombustible = function(callback){
    Vehiculo.findOne({descripcion:'Rojo'}, function(err, vehiculo){
        TipoCombustible.findOne({descripcion:"Diesel"}, function(err, tc){
            if(err){return console.error(err);}
            vehiculo.tipoCombustible = tc.descripcion;
            tc.vehiculo.push(vehiculo);
            tc.save(function(err){
                if(err){return console.error(err);}
                console.log(tc);
            });
            vehiculo.save(function (err) {
                if (err) { return console.error(err); }
                console.log(vehiculo);
            });
            callback();
        });
    });
};

async.series([
    removeEstados,
    removeTipoVehiculos,
    removeMarcaVehiculos,
    removeModeloCarros,
    removeTipoCombustibles,
    removeVehiculos,
    addEstados,
    addVehiculos,
    addTipoVehiculo,
    addMarcaVehiculo,
    addModeloVehiculo,
    addTipoCombustible,
    updateModeloOnMarca,
    updateVehiculoOnTipo,
    updateVehiculoOnMarca,
    updateVehiculoOnEstado,
    updateVehiculoOnTipoCombustible,
    updateTipoVehiculo,
    updateMarcaVehiculo,
    updateModeloOnEstado,
    updateTipoCombustible
],function(error, results){
    if (error) {
        console.error('Error: ' + error);
    }
    mongoose.connection.close();
    console.log('Done!');
    process.exit(0);
});
