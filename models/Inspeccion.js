var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InspeccionSchema = new Schema({
    vehiculo:{type:Schema.Types.ObjectId, ref:'Vehiculo'},
    cliente:{type:Schema.Types.ObjectId, ref:'Cliente'},
    tieneRalladuras:{type:Boolean},
    cantidadCombustible:{type:Number},
    tieneGomaRespuesta:{type:Boolean},
    tieneGato:{type:Boolean},
    tieneRoturasCristal:{type:Boolean},
    estadoGomas:{type:Boolean},
    fecha: {type:Date, default:Date.now},
    empleado:{type:Schema.Types.ObjectId, ref:'Empleado'},
    estado:{type:Schema.Types.ObjectId, ref:'Estado' }
});
var Inspeccion = {
    schema: InspeccionSchema,
    model: mongoose.model('Inspeccion',InspeccionSchema)
};
module.exports = Inspeccion;