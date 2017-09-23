var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Renta = require('../models/Renta').schema;
var Inspeccion = require('../models/Inspeccion').schema;

//para encriptar la contraseña
var bcrypt = require('bcrypt-nodejs');
var EmpleadoSchema = new Schema({
    email: { type: String },
    password: { type: String },
    nombre: String,
    cedula: String,
    tandaLabor: String,
    porcientoComision: { type: Number, default: 4 },
    fechaIngreso: {type:Date, default: Date.now()},
    estado: { type: String },
    renta: [Renta],
    inspeccion: [Inspeccion]
});

var Empleado = {
    schema: EmpleadoSchema,
    model: mongoose.model('Empleado', EmpleadoSchema)
};
module.exports = Empleado;