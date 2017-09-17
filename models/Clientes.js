var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientesSchema = new Schema({
    nombre:{type:String},
    cedula:{type:String},
    noTarjetaCR:{type:Number},
    limiteCredito: Number,
    tipoPersona:{type:String, default:'Fisica'},
    estado:{type:Schema.Types.ObjectId, ref:'Estado'},
    vehiculo:{type:Schema.Types.ObjectId, ref:'Vehiculo'},
    renta: [{ type: Schema.Types.ObjectId, ref: 'Renta' }],
    inspeccion: [{ type: Schema.Types.ObjectId, ref: 'Inspeccion' }]
});

var Cliente = {
    schema: ClientesSchema,
    model:mongoose.model("Cliente", ClientesSchema)
};
module.exports = Cliente;