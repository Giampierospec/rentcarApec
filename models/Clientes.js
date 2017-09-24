var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Schema = mongoose.Schema;
var Renta = require('../models/Renta').schema;
var Inspeccion = require('../models/Inspeccion').schema;
var ClientesSchema = new Schema({
    email:{type:String},
    password:{type:String},
    cedula:{type:String},
    nombre:{type:String},
    noTarjetaCR:{type:Number},
    limiteCredito: Number,
    tipoPersona:{type:String, default:'Fisica'},
    estado:{type:String},
    vehiculo:{type:String},
    renta: [Renta],
    inspeccion: [Inspeccion]
});



var Cliente = {
    schema: ClientesSchema,
    model:mongoose.model("Cliente", ClientesSchema)
};

module.exports = Cliente;