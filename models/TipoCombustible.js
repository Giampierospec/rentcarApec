var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vehiculo = require('./Vehiculo').schema;
var TipoCombustibleSchema = new Schema({
    descripcion:{type:String, required: true},
    estado:{type:Schema.Types.ObjectId, ref:'Estado'},
    vehiculo: [Vehiculo]
});
var TipoCombustible = {
    schema: TipoCombustibleSchema,
    model: mongoose.model('TipoCombustible',TipoCombustibleSchema)
};
module.exports = TipoCombustible;