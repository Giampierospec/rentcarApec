var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost:27017/RentCar';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI,{
    useMongoClient: true
});
var db = mongoose.connection;

db.on('open', function(){
    console.log('Connected to mongoose');
});
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected');
        process.exit(0);
    });
});

var Estado = require('../models/Estado');
var Vehiculo = require('../models/Vehiculo').model;
var MarcaVehiculos = require('../models/MarcaVehiculos').model;
var TipoVehiculo = require('../models/TipoVehiculo').model;
var Inspeccion = require('../models/Inspeccion').model;
var Clientes = require('../models/Clientes').model;
var ModelosCarro = require('../models/ModelosCarro').model;
var Renta = require('../models/Renta').model;
var TipoCombustible = require('../models/TipoCombustible').model;
var Empleado = require('../models/Empleado').model;


