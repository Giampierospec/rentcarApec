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
var noop = function () { };

EmpleadoSchema.pre('save', function (done) {
    var user = this;
    if (!user.isModified('password')) {
        return done();
    }
    bcrypt.genSalt(8, function (err, salt) {
        if (err) { return done(err); }
        bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
            if (err) { return done(err); }
            user.password = hashedPassword;
            done();
        });
    });
});
EmpleadoSchema.methods.validPassword = function(guess, done){
    bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};
var Empleado = {
    schema: EmpleadoSchema,
    model: mongoose.model('Empleado', EmpleadoSchema)
};
module.exports = Empleado;