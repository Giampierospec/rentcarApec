var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InspeccionSchema = new Schema({
    vehiculo:{type:String},
    cliente:{type:String},
    tieneRalladuras:{type:Boolean},
    cantidadCombustible:{type:Number},
    tieneGomaRespuesta:{type:Boolean},
    tieneGato:{type:Boolean},
    tieneRoturasCristal:{type:Boolean},
    estadoGomas:{type:Boolean},
    fecha: {type:Date, default:Date.now},
    empleado:{type:String},
    estado:{type:String }
});
var Inspeccion = {
    schema: InspeccionSchema,
    model: mongoose.model('Inspeccion',InspeccionSchema)
};
module.exports = Inspeccion;