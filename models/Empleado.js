var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpleadoSchema = new Schema({
nombre:String,
cedula: String,
tandaLabor:String,
porcientoComision: {type:Number, default:4},
fechaIngrego:Date,
estado:{type:Schema.Types.ObjectId, ref:'Estado'}
});
var Empleado = mongoose.model('Empleado', EmpleadoSchema);
module.exports = Empleado;