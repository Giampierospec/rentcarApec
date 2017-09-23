var mongoose = require('mongoose');
var Empleado = mongoose.model('Empleado');
var Estado = mongoose.model('Estado');
var Ctrl = (function(){
    var getEstados = function(req, res, next){
        Estado.find({estado:['Activo','Inactivo']})
              .select("estado")
              .exec((err, estado) =>{
                  if(err){return next(err);}
                  res.json(estado);
              });
    };
    var insertNewEmpleado = function(req, res, next){
        var empleado = new Empleado({
            email: req.body.email,
            password: req.body.password,
            nombre: req.body.nombre,
            cedula: req.body.cedula,
            tandaLabor: req.body.tanda,
            fechaIngreso: req.body.fI,
            estado: req.body.estado,
        });
        empleado.save(function(err){
            if(err){
                return next(err);
            }
            console.log(empleado);
        });
        Estado.findOne({estado:empleado.estado})
                .exec(function(err, estado){
                    if(err){
                        return next(err);
                    }
                    estado.empleado.push(empleado);
                    estado.save(function(err){
                        if(err){
                            return next(err);
                        }
                        console.log(estado);
                        req.statusCode = 200;
                        res.json({
                            user: empleado,
                            status: req.statusCode
                        });
                        return;
                    });

                });

    };
    return {
        insertNewEmpleado: insertNewEmpleado,
        getEstados: getEstados
    };
})();


module.exports = Ctrl;