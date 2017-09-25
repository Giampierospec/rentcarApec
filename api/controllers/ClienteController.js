var mongoose = require('mongoose');

var Cliente = mongoose.model('Cliente');
var User = mongoose.model('User');

var Estado = mongoose.model('Estado');

var Ctrl = (function(){
    var getClientes = function(req, res, next){
        Cliente.find({estado:'Activo'})
                .exec((err, cliente)=>{
                    if(err){return next(err);}
                    res.json(cliente);
                    return;
                });
    };
    var getInsertClientes = function(req, res, next){
        var dependencies = {
            estados:[]
        };
        Estado.find({estado:['Activo','Inactivo']})
                .select('estado')
                .exec(function(err, estados){
                    dependencies.estados = estados;
                    res.json(dependencies);
                    return;
                });
        
    };
    var insertClientes = function(req, res, next){
            var cliente = new Cliente({
                email: req.body.email,
                password: req.body.password,
                cedula: req.body.cedula,
                nombre:req.body.nombre,
                noTarjetaCR: req.body.tarjeta,
                limiteCredito: req.body.credito,
                tipoPersona: req.body.tipoPersona,
                estado: req.body.estado
            });
            cliente.save(function(err){
                if(err){return next(err);}
            });
            var user = new User({
                email:cliente.email,
                password:cliente.password,
                tipo:'cliente'
            });
            user.save(function(err){
                if(err){return next(err);}
            });
            Estado.findOne({estado:cliente.estado})
                    .exec((err, estado)=>{
                        if(err){return next(err);}
                        estado.cliente.push(cliente);
                        estado.save(function(err){
                            if(err){return next(err);}
                        });
                        res.json("Ok");
                        return;
                    });
    };
    var getEditClientes = function(req, res, next){
        var clienteId = req.params.clienteId;
        var dependencies = {
            estados: [],
            cliente:{}
        };
        Cliente.findById(clienteId)
                .exec(function(err, cliente){
                    if(err){return next(err);}
                    dependencies.cliente = cliente;
                });
        Estado.find({ estado: ['Activo', 'Inactivo'] })
            .select('estado')
            .exec(function (err, estados) {
                dependencies.estados = estados;
                res.json(dependencies);
                return;
            });
    };
    var editClientes = function(req, res, next){
        var clienteId = req.params.clienteId;
        Cliente.findById(clienteId)
                .exec(function(err, cliente){
                cliente.cedula = req.body.cedula;
                cliente.nombre = req.body.nombre;
                cliente.noTarjetaCR = req.body.tarjeta;
                cliente.limiteCredito = req.body.credito;
                cliente.tipoPersona = req.body.tipoPersona;
                cliente.estado = req.body.estado;
                
                cliente.save(function(err){
                    if(err){return next(err);}
                });
                Estado.findOneAndUpdate({estado:cliente.estado,'cliente._id':cliente._id},
                {
                    '$set':{
                        'cliente.$':cliente
                    }
                }).exec((err, estado)=>{
                    if(err){return next(err);}
                    if(!estado){
                        Estado.findOne({estado:cliente.estado})
                                .exec((err, estado)=>{
                                    if(err){return next(err);}
                                    estado.cliente.push(cliente);
                                    estado.save(function(err){
                                        if(err){return next(err);}
                                    });
                                });
                    }
                    res.json('Ok');
                    return;
                });
            });
    };
    return{
        getClientes: getClientes,
        getInsertClientes:getInsertClientes,
        insertClientes: insertClientes,
        getEditClientes: getEditClientes,
        editClientes: editClientes
    };
})();
module.exports = Ctrl;