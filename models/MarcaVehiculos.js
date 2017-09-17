var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vehiculo = require('./Vehiculo').schema;
var Modelo = require('./ModelosCarro').schema;
/**
 * Modelado de las marcas de los vehiculos
 */
var MarcaVehiculosSchema = new Schema({
    Descripcion: { type: String, required: true },
    estado: { type: Schema.Types.ObjectId, ref: 'Estado' },
    vehiculo: [Vehiculo],
    modelo: [Modelo]
});

var MarcaVehiculos = {
    model:mongoose.model('MarcaVehiculos', MarcaVehiculosSchema),
    schema: MarcaVehiculosSchema
};
module.exports = MarcaVehiculos;