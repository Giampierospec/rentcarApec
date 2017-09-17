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
            noChasis:Math.random() * 10000,
            noMotor:Math.random() * 10000,
            noPlaca: Math.random() * 10000

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
var updateTipoVehiculo = function(callback){
    TipoVehiculo.findOne({ descripcion: 'Suv' }, function (err, tipovehiculo) {
        console.log(tipovehiculo);
    
        Estados.findOne({ estado: 'Activo' }, function (err, estado) {
            if (err) { return console.error(err); }
            console.log(estado);
            estado.tipoVehiculo.push(tipovehiculo._id);
            estado.save(function(err){
                if(err){return console.error("error");}
                console.log(estado);
            });
            tipovehiculo.estado = estado.estado;
            tipovehiculo.save(function (err) {
                if (err) { return console.log(err); }
                console.log(tipovehiculo);
            });
            callback();
        });
        
        
    });
};
var addMarcaVehiculo = function(callback){
MarcaVehiculo.create(data.marcaVehiculo, function(err, marca){

});
};
var updateVehiculo = function(callback){
    Vehiculo.find({}, function(err, vehiculo){

        Estados.findOne({estado: 'Activo'}, function(err, estado){
            if (err) { return console.error(err); }
            estado.vehiculo.push(vehiculo[0]);
            estado.save(function (err) {
                if (err) { return console.error("error"); }
                console.log(estado);
            });
            vehiculo.estado = estado.estado;
            vehiculo[0].save(function (err) {
                if (err) { return console.log(err); }
                console.log(vehiculo);
            });
            
        });
        TipoVehiculo.findOne({descripcion:"Suv"}, function(err, tv){
            tv.vehiculo.push(vehiculo[0]);
            vehiculo[0].tipoVehiculo = tv.descripcion;
            tv.save(function(err){
                if(err){return console.error(err);}
                console.log(tv);
            });
            vehiculo[0].save(function (err) {
                if (err) { return console.log(err); }
                console.log(vehiculo);
            });
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
    updateTipoVehiculo,
    updateVehiculo
],function(error, results){
    if (error) {
        console.error('Error: ' + error);
    }
    mongoose.connection.close();
    console.log('Done!');
});
