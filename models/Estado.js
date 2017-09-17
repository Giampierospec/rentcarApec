var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//declaracion de los esquemas que pertenecen a tipovehiculo
var TipoVehiculo = require('./TipoVehiculo').schema;
var marcaVehiculo = require('./MarcaVehiculos').schema;
var modeloCarro = require('./ModelosCarro').schema;
var tipoCombustible = require('./TipoCombustible').schema;
var Vehiculo = require('./Vehiculo').schema;
var Cliente = require('./Clientes').schema;
var Inspeccion = require('./Inspeccion').schema;
var Empleado = require('./Empleado').schema;
var Renta = require('./Renta').schema;
/**
 * Declaracion del esquema de estados
 */
var EstadoSchema = new Schema({
    estado: {type:String, default:'Activo'},
    tipoVehiculo: [TipoVehiculo],
    marcaVehiculo:[marcaVehiculo],
    modeloVehiculo: [modeloCarro],
    tipoCombustible:[tipoCombustible],
    vehiculo:[Vehiculo],
    cliente:[Cliente],
    inspeccion:[Inspeccion],
    empleado:[Empleado],
    renta: [Renta]

});

var Estado = mongoose.model('Estado',EstadoSchema);

module.exports = Estado;