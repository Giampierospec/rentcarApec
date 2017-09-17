var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpleadoSchema = new Schema({
    nombre: String,
    cedula: String,
    tandaLabor: String,
    porcientoComision: { type: Number, default: 4 },
    fechaIngrego: Date,
    estado: { type: Schema.Types.ObjectId, ref: 'Estado' },
    renta: [{ type: Schema.Types.ObjectId, ref: 'Renta' }],
    inspeccion: [{ type: Schema.Types.ObjectId, ref: 'Inspeccion' }]
});
var Empleado = {
    schema: EmpleadoSchema,
    model: mongoose.model('Empleado', EmpleadoSchema)
};
module.exports = Empleado;