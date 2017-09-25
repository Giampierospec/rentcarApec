var User = require('../models/User');
var passport = require('passport');
var apiOptions = require('../utils/serverLocation');
var request = require('request');
var Ctrl = (function(){
    var ensureIsAuthenticated = function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect('/');
            return;
        }
    };
    var preventEntering = function(req,res, next){
        if (req.isAuthenticated()) {
            res.redirect('/Vehiculos');
            return;
        }
        else {
            return next();
        }
    };

    var renderLogin = function(req, res, next){
        res.render('login',{
            title:'Ingresar',
            error: req.flash('loginMessage')
        });
    };

    var loginCheck = function(req, res, next){
        req.checkBody('email','El email es requerido').notEmpty();
        req.checkBody('password', 'la contraseña es requerida').notEmpty();
        var errors = req.validationErrors();
        if(errors){
            res.render('login', {
                title: 'Ingresar',
                errors: errors
            });
            return;
        }
        else{
            return next();
        }
    };

    var renderSignup = function(req, res, next){
        res.render('signup',{title:'Crear usuario'});

    };
    var checkUserEmpleadoAdmin = function(req, res, next){
        if(req.user.tipo ==='admin' || req.user.tipo ==='empleado'){
            return next();
        }
        else{
            res.render('noTieneAcceso',{
                title:'No tiene acceso'
            });
            return;
        }
    };
    var checkAdmin = function(req, res, next){
        if (req.user.tipo === 'admin') {
            return next();
        }
        else {
            res.render('noTieneAcceso', {
                title: 'No tiene acceso'
            });
            return;
        }
    };
    var signup = function(req, res, next){
        var path = apiOptions.server+'/api/Users';
        var requestOptions ={
            url: path,
            method: 'POST',
            json: req.body
        };
        req.checkBody('email','El email es requerido').notEmpty();
        req.checkBody('password','la contraseña es requerida').notEmpty();
        req.checkBody('tipo','El nombre es requerido').notEmpty();
        var errors = req.validationErrors();
        if(errors){
            res.render('signup',
                {
                    title: 'Crear usuario',
                    errors: errors
                });
            return;
        }
        else {
            User.findOne({ email: req.body.email })
                .exec((err, user) => {
                    if(err){
                        return next(err);
                    }
                    if (empleado){
                        var error = new Error('El Usuario ya existe');
                        res.render('signup',
                            {
                                title: 'Crear usuario',
                                error: error
                            });
                        return;
                    }
                    request(requestOptions, function(err, response,body){
                        if(err){return next(err);}
                        if(response.statusCode === 404){
                            return next(err);
                        }
                        console.log(body);
                        return next();
                    });
                });
        }
    };
    var passportRedirect = passport.authenticate('login',{
                successRedirect:'/Vehiculos',
                failureRedirect:'/auth/login',
                failureFlash: true
            });
    var logout = function(req, res, next){
        req.logout();
        res.redirect('/Vehiculos');
    };
    return {
        ensureIsAuthenticated: ensureIsAuthenticated,
        renderSignup:renderSignup,
        signup: signup,
        preventEntering: preventEntering,
        passportRedirect: passportRedirect,
        renderLogin: renderLogin,
        loginCheck: loginCheck,
        logout: logout,
        checkUserEmpleadoAdmin: checkUserEmpleadoAdmin,
        checkAdmin: checkAdmin
    };
    
})();

module.exports = Ctrl;