var mongoose = require('mongoose');
var Vehiculo = mongoose.model('Vehiculo');
var Inspeccion = mongoose.model('Inspeccion');
var Estado = mongoose.model('Estado');
var TipoVehiculo = mongoose.model('TipoVehiculo');
var Marca = mongoose.model('MarcaVehiculos');
var Modelo = mongoose.model('ModeloCarro');
var TipoCombustible = mongoose.model('TipoCombustible');
var Cliente = mongoose.model('Cliente');
var Empleado = mongoose.model('Empleado');

var Renta = mongoose.model('Renta');

var Ctrl = (function(){
var changeEstadoVehiculo = function(req, res, next){
    var vehiculoId = req.body.vehiculoId;
    Vehiculo.findById(vehiculoId)
            .exec((err, vehiculo)=>{
                if(err){return next(err);}
                vehiculo.estado = 'Inspeccion';
                vehiculo.save(function(err){
                    if(err){return next(err);}
                });
                TipoVehiculo.findOneAndUpdate({ descripcion: vehiculo.tipoVehiculo, "vehiculo._id": vehiculoId },
                    {
                        "$set": {
                            "vehiculo.$": vehiculo
                        }
                    })
                    .exec(function (err, tv) {
                        if (err) { return next(err); }
                        if (!tv) {
                            TipoVehiculo.findOne({ descripcion: vehiculo.tipoVehiculo })
                                .exec(function (err, tv) {
                                    if (err) { return next(err); }
                                    tv.vehiculo.push(vehiculo);
                                    tv.save(function (err) {
                                        if (err) { return next(err); }
                                    });
                                });

                        }
                        console.log(tv);
                    });

                Marca.findOneAndUpdate({ descripcion: vehiculo.marca, "vehiculo._id": vehiculoId },
                    {
                        "$set": {
                            "vehiculo.$": vehiculo
                        }
                    })
                    .exec(function (err, mr) {
                        if (err) { return next(err); }
                        if (!mr) {
                            Marca.findOne({ descripcion: vehiculo.marca })
                                .exec(function (err, mr) {
                                    if (err) { return next(err); }
                                    mr.vehiculo.push(vehiculo);
                                    mr.save(function (err) {
                                        if (err) { return next(err); }
                                    });
                                });

                        }
                        console.log(mr);
                    });

                Modelo.findOneAndUpdate({ descripcion: vehiculo.modelo, "vehiculo._id": vehiculoId },
                    {
                        "$set": {
                            "vehiculo.$": vehiculo
                        }
                    })
                    .exec(function (err, md) {
                        if (err) { return next(err); }
                        if (!md) {
                            Modelo.findOne({ descripcion: vehiculo.modelo })
                                .exec(function (err, md) {
                                    if (err) { return next(err); }
                                    md.vehiculo.push(vehiculo);
                                    md.save(function (err) {
                                        if (err) { return next(err); }
                                    });
                                });

                        }
                        console.log(md);
                    });
                TipoCombustible.findOneAndUpdate({ descripcion: vehiculo.tipoCombustible, "vehiculo._id": vehiculoId },
                    {
                        "$set": {
                            "vehiculo.$": vehiculo
                        }
                    })
                    .exec(function (err, tc) {
                        if (err) { return next(err); }
                        if (!tc) {
                            TipoCombustible.findOne({ descripcion: vehiculo.tipoCombustible })
                                .exec(function (err, tc) {
                                    if (err) { return next(err); }
                                    tc.vehiculo.push(vehiculo);
                                    tc.save(function (err) {
                                        if (err) { return next(err); }
                                    });
                                });
                        }
                        console.log(tc);
                    });
                Estado.findOneAndUpdate({estado: vehiculo.estado, 'vehiculo._id':vehiculo._id},{
                    '$set':{
                        'vehiculo.$':vehiculo
                    }
                })
                .exec((err, estado)=>{
                    if(err){return next(err);}
                    if(!estado){
                        Estado.findOne({estado: vehiculo.estado})
                              .exec(function(err,estado){
                                  if (err) { return next(err); }
                                  estado.vehiculo.push(vehiculo);
                                  estado.save((err)=>{
                                      if(err){return next(err);}
                                  });
                              });
                    }
                    res.json('Ok');
                    return;
                });
            });
};
var showVehiculosWithEstadoInspeccion = function(req, res, next){
    Vehiculo.find({estado:'Inspeccion'})
            .exec((err, vehiculos)=>{
                if(err){return next(err);}
                res.json(vehiculos);
                return;
            });
};

var getInsertInspeccion = function(req, res, next){
    var vehiculo = req.params.vehiculoDesc;
    var dependencies = {
        clientes:[],
        empleados:[],
        vehiculo:vehiculo,
        estados:[]
    };
    Cliente.find({estado:'Activo'})
            .exec(function(err, clientes){
                if(err){return next(err);}
                dependencies.clientes  = clientes;
            });
    Empleado.find({ estado: 'Activo' })
        .exec(function (err, empleados) {
            if (err) { return next(err); }
            dependencies.empleados = empleados;
        });
    Estado.find({ estado: ['Activo','Inactivo']})
        .select('estado')
        .exec(function (err, estados) {
            if (err) { return next(err); }
            dependencies.estados = estados;
            res.json(dependencies);
            return;
        });
};

var insertInspeccion = function(req, res, next){
    var vehiculo = req.params.vehiculoDesc;
        var inspeccion = new Inspeccion({
            vehiculo: req.body.vehiculo,
            cliente: req.body.cliente,
            tieneRalladuras: req.body.ralladura,
            cantidadCombustible: req.body.cantCombustible,
            tieneGomaRespuesta: req.body.gomaRespuesta,
            tieneGato: req.body.gato,
            tieneRoturasCristal: req.body.roturasCristal,
            estadoGomas: req.body.gomas,
            fecha: new Date(),
            empleado: req.body.empleado,
            estado: req.body.estado
        });
        inspeccion.save((err)=>{
            if(err){return next(err);}
            console.log(inspeccion);
        });
        var renta = new Renta({
            empleado: req.body.empleado,
            vehiculo: req.body.vehiculo,
            cliente: req.body.cliente,
            fechaRenta: new Date(),
            comentario: 'Ok',
            estado: req.body.estado
        });
        renta.save(function(err){
            if(err){return next(err);}
            console.log(renta);
        });
        Vehiculo.findOne({descripcion: vehiculo})
                .exec(function(err, vehiculo){
                    vehiculo.estado = 'Inactivo';
                    vehiculo.save(function(err){
                        if(err){return next(err);}
                    });
                });
        Cliente.findOne({email: inspeccion.cliente})
                .exec(function(err, cliente){
                    if(err){return next(err);}
                    cliente.inspeccion.push(inspeccion);
                    cliente.renta.push(renta);
                    cliente.save(function(err){
                        if(err){return next(err);}
                    });
                });
                console.log(req.body.empleado);
        Empleado.findOne({email: req.body.empleado })
            .exec(function (err, empleado) {
                if (err) { return next(err); }
                empleado.inspeccion.push(inspeccion);
                empleado.renta.push(renta);
                empleado.save(function (err) {
                    if (err) { return next(err); }
                });
            });
        Estado.findOne({ estado: inspeccion.estado })
            .exec(function (err, estado) {
                if (err) { return next(err); }
                estado.inspeccion.push(inspeccion);
                estado.renta.push(renta);
                estado.save(function (err) {
                    if (err) { return next(err); }
                });
                res.json('OK');
                return;
            });
        
};
var getInspeccionClientes = function(req,res,next){
    var clienteEmail = req.query.clienteEmail;
    Cliente.findOne({email: clienteEmail})
            .exec((err, cliente)=>{
                if(err){return next(err);}
                if(!cliente){
                    Inspeccion.find({estado:'Activo'})
                              .exec(function(err, inspeccion){
                                  if(err){return next(err);}
                                  res.json({
                                      inspeccion: inspeccion,
                                      cliente: "TODOS"
                                  });
                                  return;
                              });
                   
                }else{

                
                res.json({
                    inspeccion: cliente.inspeccion,
                    cliente: cliente.nombre
                });
                return;
                }
            });
};

    var getInspeccionEmpleados = function (req, res, next) {
        var empleadoEmail = req.query.empleadoEmail;
        Empleado.findOne({ email: empleadoEmail })
            .exec((err, empleado) => {
                if (err) { return next(err); }
                if (!empleado) {
                    Inspeccion.find({ estado: 'Activo' })
                        .exec(function (err, inspeccion) {
                            if (err) { return next(err); }
                            res.json({
                                inspeccion: inspeccion,
                                empleado: "Todos"
                            });
                            return;
                        });

                } else {


                    res.json({
                        inspeccion: empleado.inspeccion,
                        empleado: empleado.nombre
                    });
                    return;
                }
            });
    };

return {
    changeEstadoVehiculo: changeEstadoVehiculo,
    showVehiculosWithEstadoInspeccion: showVehiculosWithEstadoInspeccion,
    getInsertInspeccion: getInsertInspeccion,
    insertInspeccion: insertInspeccion,
    getInspeccionClientes: getInspeccionClientes,
    getInspeccionEmpleados: getInspeccionEmpleados
};
})();

module.exports = Ctrl;