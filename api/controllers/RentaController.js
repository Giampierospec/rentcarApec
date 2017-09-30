var mongoose = require('mongoose');
var Renta = mongoose.model('Renta');
var Estado = mongoose.model('Estado');
var Cliente = mongoose.model('Cliente');
var Empleado = mongoose.model('Empleado');

var Ctrl = (function(){
var getRentaClientes = function(req, res, next){
    var clienteEmail = req.query.clienteEmail;
    Cliente.findOne({email: clienteEmail})
            .exec((err, cliente)=>{
                if(err){return next(err);}
                if(!cliente){
                    Renta.find({estado:'Activo'})
                            .exec((err, rentas)=>{
                                if(err){return next(err);}
                                res.json({
                                    renta: rentas,
                                    cliente: 'Todos'
                                });
                                return;
                            });
                }
               else{
                    res.json({
                        renta: cliente.renta,
                        cliente: cliente.nombre
                    });
                    return;
               }
            });
};
var getRentaEmpleados = function (req, res, next) {
    var empleadoEmail = req.query.empleadoEmail;
    Empleado.findOne({ email: empleadoEmail })
        .exec((err, empleado) => {
            if (err) { return next(err); }
            if (!empleado) {
                Renta.find({ estado: 'Activo' })
                    .exec((err, rentas) => {
                        if (err) { return next(err); }
                        res.json({
                            renta: rentas,
                            empleado: 'Todos'
                        });
                        return;
                    });
            }
            else{
                res.json({
                    renta: empleado.renta,
                    empleado: empleado.nombre
                });
                return;
            }
        });
};
return {
    getRentaClientes: getRentaClientes,
    getRentaEmpleados: getRentaEmpleados
};
})();

module.exports = Ctrl;