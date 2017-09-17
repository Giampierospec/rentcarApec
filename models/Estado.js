var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Declaracion del esquema de estados
 */
var EstadoSchema = new Schema({
    estado: {type:String, default:'Activo'},
    tipoVehiculo: [{ type: Schema.Types.ObjectId, ref:'TipoVehiculo'}],
    marcaVehiculo:[{type: Schema.Types.ObjectId, ref:'MarcaVehiculo'}],
    modeloVehiculo: [{ type: Schema.Types.ObjectId, ref: 'ModeloCarro' }],
    tipoCombustible:[{type:Schema.Types.ObjectId, ref:'TipoCombustible'}],
    vehiculo:[{type:Schema.Types.ObjectId, ref:'Vehiculo'}],
    cliente:[{type:Scehma.Types.ObjectId, ref:'Cliente'}]

});

var Estado = mongoose.model('Estado',EstadoSchema);

module.exports = Estado;