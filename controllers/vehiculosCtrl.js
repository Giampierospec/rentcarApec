var request = require('request');
var apiOptions = {
    server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://giamp-loc8r-gettingmean.herokuapp.com';
}
/**
 * Controlador que determina todas las funciones concernientes a los vehiculos
 */
var vehiculos = (function(){
 var getVehiculos = function(req, res, next){
    var path = apiOptions.server +'/api/Vehiculos';
    var requestOptions = {
        method: 'GET',
        url: path
    };
    request(requestOptions, function(err, response, body){
        if(err){return next(err);}
        if(response.statusCode === 404){
            res.render('error');
        }
        console.log(JSON.parse(body));

        res.render('Vehiculos',{
            title:"Vehiculos",
            data: JSON.parse(body)
        });
    });
 };
 var renderInsertVehiculo = function(req, res, next){
    
 };
 return {
     getVehiculos: getVehiculos
 };
})();


module.exports = vehiculos;