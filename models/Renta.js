var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RentaSchema = new Schema({
empleado:{type:String},
vehiculo:{type:String},
cliente: {type:String},
fechaRenta: Date,
fechaDevolucion: Date,
montoxDia: Number,
cantidadDeDias: Number,
comentario:String,
estado:{type:String}
});

var Renta = {
    schema: RentaSchema,
    model:mongoose.model('Renta', RentaSchema)
};
module.exports = Renta;