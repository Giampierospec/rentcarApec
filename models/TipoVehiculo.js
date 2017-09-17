var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Modelado del tipo de vehiculo
 */
var Vehiculo = require('./Vehiculo').schema;
var TipoVehiculoSchema = new Schema({
    descripcion:{type: String, required: true},
    estado:{type:String},
    vehiculo: [Vehiculo]
});
exports.model = mongoose.model("TipoVehiculo", TipoVehiculoSchema);
exports.schema = TipoVehiculoSchema;