var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Modelado de las marcas de los vehiculos
 */
var MarcaVehiculosSchema = new Schema({
    Descripcion: { type: String, required: true },
    estado: { type: Schema.Types.ObjectId, ref: 'Estado' },
    vehiculo: [{ type: Schema.Types.ObjectId, ref: 'Vehiculo' }]
});

var MarcaVehiculos = mongoose.model('MarcaVehiculos', MarcaVehiculosSchema);
module.exports = MarcaVehiculos;