var LocalStrategy = require('passport-local').Strategy;

var Empleado = require('../models/Empleado').model;
var passport = require('passport');
module.exports = function(){
    
    passport.serializeUser((user, done) =>{
        done(null, user.id);
    });

    passport.deserializeUser((id, done)=>{
        Empleado.findById(id)
                .exec(function(err, user){
                    done(err, user);
                });
    });
    //registro local
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done){
        Empleado.findOne({email:username})
                .exec((err, user) =>{
                    if(err){
                        return done(err);
                    }
                    if(!user){
                        return done(null, false, req.flash('loginMessage','Usuario no encontrado'));
                    }
                    user.validPassword(password, function (err, isMatch) {
                        if (err) { return done(err); }
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, req.flash('loginMessage', 'contraseña incorrecta'));
                        }
                    });
                });
    }));
};