var mongoose = require('mongoose');
var Empleado = mongoose.model('Empleado');
var User = mongoose.model('User');
var Estado = mongoose.model('Estado');
var Ctrl = (function(){
    var getEstados = function(req, res, next){
        var dependencies = {
            estados:[]
        };
        Estado.find({estado:['Activo','Inactivo']})
              .select("estado")
              .exec((err, estado) =>{
                  if(err){return next(err);}
                  dependencies.estados = estado;
                  res.json(dependencies);
              });
    };
    var getAllEmpleados = function(req, res, next){
        Empleado.find({estado:'Activo'})
                .exec(function(err, empleados){
                    if(err){return next(err);}
                    res.json(empleados);
                    return;
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
        var user = new User({
            email: empleado.email,
            password: empleado.password,
            tipo: 'empleado'
        });
        user.save(function(err){
            if(err){return next(err);}
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
    var getEditEmpleado = function(req, res, next){
        var empId = req.params.empleadoId;
        var dependencies = {
            estados: [],
            empleado: {}
        };
        Empleado.findById(empId)
                .exec(function(err, empleado){
                    if (err) { return next(err); }
                    dependencies.empleado = empleado;
                });
        Estado.find({ estado: ['Activo', 'Inactivo'] })
            .select("estado")
            .exec((err, estado) => {
                if (err) { return next(err); }
                dependencies.estados = estado;
                res.json(dependencies);
            });
    };
    var editEmpleado = function(req, res, next){
        var empId = req.params.empleadoId;
        Empleado.findById(empId)
                .exec(function(err, empleado){
                    if(err){return next(err);}
                    empleado.email = req.body.email;
                    empleado.password = req.body.password;
                    empleado.nombre = req.body.nombre;
                    empleado.cedula = req.body.cedula;
                    empleado.tandaLabor = req.body.tanda;
                    empleado.fechaIngreso = req.body.fI;
                    empleado.estado = req.body.estado;
                    empleado.save(function(err){
                        if(err){return next(err);}
                    });
                    Estado.findByIdAndUpdate({estado:empleado.estado, 'empleado._id':empleado._id},
                    {
                        '$set':
                        {
                            'empleado.$':empleado
                        }
                    }).exec((err, estado)=>{
                        if(err){return next(err);}
                        if(!estado){
                            Estado.findOne({estado:empleado.estado})
                                .exec(function(err,estado){
                                    if(err){return next(err);}
                                    estado.empleado.push(empleado);
                                    estado.save(function(err){
                                        if(err){return next(err);}
                                    });
                                });
                        }
                        res.json({
                            empleado: empleado
                        });
                        return;
                    });
                });
    };
    return {
        insertNewEmpleado: insertNewEmpleado,
        getEstados: getEstados,
        getAllEmpleados: getAllEmpleados,
        getEditEmpleado: getEditEmpleado,
        editEmpleado: editEmpleado
    };
})();


module.exports = Ctrl;