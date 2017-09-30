var request = require('request');
var Renta = require('../models/Renta').model;
var apiOptions = require('../utils/serverLocation');

var Ctrl = (function(){
    var getRentaClientes = function(req, res, next){
        var clienteEmail = req.query.clienteEmail;
        var path = "";
        if(clienteEmail){
            path = apiOptions.server+'/api/getRentaClientes/?clienteEmail='+clienteEmail;
        }else{
            path = apiOptions.server +'/api/getRentaClientes';
        }
        var requestOptions = {
            url: path,
            method: 'GET'
        };
        request(requestOptions,function(err, response, body){
            if(err){return next(err);}
            if(response.statusCode === 404){
                res.render("error");
                return;
            }
            var renta = JSON.parse(body);
            var msg = "Todos";
            if(renta.cliente !== null){
                msg = renta.cliente;
            }
            res.render('ClientesRenta',{
                title: 'Renta clientes',
                data: renta.renta,
                msg: msg
            });
            return;
        });
    };
    var getRentaEmpleados = function (req, res, next) {
        var empleadoEmail = req.query.empleadoEmail;
        var path = "";
        if (empleadoEmail) {
            path = apiOptions.server + '/api/getRentaEmpleados/?empleadoEmail=' + empleadoEmail;
        } else {
            path = apiOptions.server + '/api/getRentaEmpleados';
        }
        var requestOptions = {
            url: path,
            method: 'GET'
        };
        request(requestOptions, function (err, response, body) {
            if (err) { return next(err); }
            if (response.statusCode === 404) {
                res.render("error");
                return;
            }
            var renta = JSON.parse(body);
            var msg = "Todos";
            if (renta.empleado !== null) {
                msg = renta.empleado;
            }
            res.render('EmpleadosRenta', {
                title: 'Renta Empleados',
                data: renta.renta,
                msg: msg
            });
            return;
        });
    };
    return {
        getRentaClientes: getRentaClientes,
        getRentaEmpleados: getRentaEmpleados
    };
})();

module.exports = Ctrl;