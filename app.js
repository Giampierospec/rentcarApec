var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var session = require('express-session');
var flash = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
require('./Connection/dbConnection');
var vehiculos = require('./routes/vehiculos');
var users = require('./routes/users');
var tipoVehiculos = require('./routes/tipoVehiculo');
var api = require('./api/routes/apiRoutes');
var marca = require('./routes/marca');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'TKRv0IJs=HYqrvagQ#&!F!%V]Ww/4KiVs$s,<<MX',
  resave: true,
  saveUninitialized: true
}));
app.use(flash());

app.use('/', vehiculos);
app.use('/users', users);
app.use('/tipoVehiculos',tipoVehiculos);
app.use('/marcaVehiculo',marca);
app.use('/api',api);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.errors = req.flash('Error',err.message);
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});


module.exports = app;
