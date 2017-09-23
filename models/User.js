var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
    email:{type:String},
    password:{type:String},
    tipo:{type:String}
});

var noop = function () { };

UserSchema.pre('save', function (done) {
    var user = this;
    if (!user.isModified('password')) {
        return done();
    }
    bcrypt.genSalt(8, function (err, salt) {
        if (err) { return done(err); }
        bcrypt.hash(user.password, salt, noop, function (err, hashedPassword) {
            if (err) { return done(err); }
            user.password = hashedPassword;
            done();
        });
    });
});
UserSchema.methods.validPassword = function (guess, done) {
    bcrypt.compare(guess, this.password, function (err, isMatch) {
        done(err, isMatch);
    });
};
var User = mongoose.model('User',UserSchema);
module.exports = User;