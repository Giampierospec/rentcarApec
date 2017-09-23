var mongoose = require('mongoose');

var User = mongoose.model('User');


var Ctrl = (function(){

    var insertUser = function(req, res, next){
        var user = new User({
            email:req.body.email,
            password: req.body.password,
            tipo: req.body.tipo
        });
        user.save(function(err){
            if(err){return next(err);}
            console.log(user);
            req.statusCode = 200;
            res.json({
                status: req.statusCode,
                usr: user
            });
            return;
        });
    };
    var getUsers = function(req, res, next){
        User.find({})
            .exec((err, user) =>{
                if(err){return next(err);}
                res.json(user);
            });
    };
    return {
        insertUser: insertUser,
        getUsers: getUsers
    };

})();


module.exports = Ctrl;