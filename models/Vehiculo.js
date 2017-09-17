var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/**
 * Esquema para los vehiculos
 */
var VehiculoSchema = new Schema({
    Descripcion: { type: String, required: true },
    noChasis: { type: Number, required: true },
    noMotor: { type: Number, required: true },
    noPlaca: { type: Number },
    tipoVehiculo: { type: Schema.Types.ObjectId, ref: 'TipoVehiculo' },
    marca: { type: Schema.Types.ObjectId, ref: 'MarcaVehiculos' },
    modelo: {type:Schema.Types.ObjectId, ref:'ModeloCarro'},
    tipoCombustible:{type:Schema.Types.ObjectId, ref:'TipoCombustible'},
    estado:{type:Schema.Types.ObjectId, ref:'Estado'}
});

var Vehiculo = mongoose.model('Vehiculo', VehiculoSchema);

module.exports = Vehiculo;