var Empleado = require('../models/Empleado').model;
var passport = require('passport');
var apiOptions = require('../utils/serverLocation');
var request = require('request');
var Ctrl = (function(){
    var ensureIsAuthenticated = function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        else{
            res.redirect('/auth/login');
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
    var signup = function(req, res, next){
        var path = apiOptions.server+'/api/Users';
        var requestOptions ={
            url: path,
            method: 'POST',
            json: req.body
        };
        req.checkBody('email','El email es requerido').notEmpty();
        req.checkBody('password','la contraseña es requerida').notEmpty();
        req.checkBody('nombre','El nombre es requerido').notEmpty();
        req.checkBody('cedula','La cedula es requerida').notEmpty();
        req.checkBody('tanda','La tanda de labores es requerida').notEmpty();
        req.checkBody('estado','el estado es requerido').notEmpty();
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
            Empleado.findOne({ username: req.body.username })
                .exec((err, empleado) => {
                    if(err){
                        return next(err);
                    }
                    if (empleado){
                        var error = new Error('El empleado ya existe');
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
        logout: logout
    };
    
})();

module.exports = Ctrl;