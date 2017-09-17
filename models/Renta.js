var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RentaSchema = new Schema({
empleado:{type:Schema.Types.ObjectId, ref:'Empleado'},
vehiculo:{type:Schema.Types.ObjectId, ref:'Vehiculo'},
cliente: {type:Schema.Types.ObjectId, ref:'Cliente'},
fechaRenta: Date,
fechaDevolucion: Date,
montoxDia: Number,
cantidadDeDias: Number,
comentario:String,
estado:{type:Schema.Types.ObjectId, ref:'Estado'}
});

var Renta = {
    schema: RentaSchema,
    model:mongoose.model('Renta', RentaSchema)
};
module.exports = Renta;