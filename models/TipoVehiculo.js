var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Modelado del tipo de vehiculo
 */
var TipoVehiculoSchema = new Schema({
    Descripcion:{type: String, required: true},
    estado:{type:Schema.Types.ObjectId, ref:'Estado' },
    vehiculo: [{ type: Schema.Types.ObjectId, ref: 'Vehiculo' }]
});



var TipoVehiculo = mongoose.model("TipoVehiculo",TipoVehiculoSchema);
module.exports = TipoVehiculo;