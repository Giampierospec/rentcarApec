var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ModeloSchema = new Schema({
    marca:{type:Schema.Types.ObjectId, ref:'MarcaVehiculo'},
    descripcion:{type:String, required:true},
    estado: { type: Schema.Types.ObjectId, ref: 'Estado' },
    vehiculo: [{ type: Schema.Types.ObjectId, ref: 'Vehiculo' }]
});

var ModeloCarro = mongoose.model('ModeloCarro',ModeloSchema);
module.exports = ModeloCarro;