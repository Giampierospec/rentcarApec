var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Vehiculo = require('./Vehiculo').schema;
var ModeloSchema = new Schema({
    marca:{type:Schema.Types.ObjectId, ref:'MarcaVehiculo'},
    descripcion:{type:String, required:true},
    estado: { type: Schema.Types.ObjectId, ref: 'Estado' },
    vehiculo: [Vehiculo]
});

var ModeloCarro = {
    model: mongoose.model('ModeloCarro',ModeloSchema),
    schema: ModeloSchema
};

module.exports = ModeloCarro;