var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Inspeccion = require('./Inspeccion').schema;
/**
 * Esquema para los vehiculos
 */
var VehiculoSchema = new Schema({
    descripcion: { type: String, required: true },
    noChasis: { type: Number, required: true },
    noMotor: { type: Number, required: true },
    noPlaca: { type: Number },
    tipoVehiculo: { type: String},
    marca: { type: String},
    modelo: {type:String},
    tipoCombustible:{type:String},
    estado:{type:String},
    inspeccion: [Inspeccion]
});

var Vehiculo = {
    schema: VehiculoSchema,
    model:mongoose.model('Vehiculo', VehiculoSchema)
};

module.exports = Vehiculo;