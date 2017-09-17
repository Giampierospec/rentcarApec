var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TipoCombustibleSchema = new Schema({
    descripcion:{type:String, required: true},
    estado:{type:Schema.Types.ObjectId, ref:'Estado'},
    vehiculo: [{ type: Schema.Types.ObjectId, ref: 'Vehiculo' }]
});
var TipoCombustible = mongoose.model('TipoCombustible',TipoCombustibleSchema);
module.exports = TipoCombustible;