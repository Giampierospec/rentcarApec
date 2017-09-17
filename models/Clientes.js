var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientesSchema = new Schema({
    nombre:{type:String},
    cedula:{type:String},
    noTarjetaCR:{type:Number},
    limiteCredito: Number,
    tipoPersona:{Type:String, default:'Fisica'},
    estado:{type:Schema.Types.ObjectId, ref:'Estado'},
    vehiculo:{Type:Schema.Types.ObjectId, ref:'Vehiculo'}
});

var Cliente = mongoose.model("Cliente", ClientesSchema);
module.exports = Cliente;