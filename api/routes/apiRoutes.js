var express = require('express');

var router = express.Router();
var vehiculoCtrl = require('../controllers/VehiculosController');
var tipoVehiculoCtrl = require('../controllers/tipoVehiculoControlller');
var marcasCtrl = require('../controllers/marcaController');

var empleadoCtrl = require('../controllers/EmpleadoController');

var UserCtrl = require('../controllers/UsersController');

var authCtrl = require("../../controllers/authController");
//User
router.route('/Users')
      .get(authCtrl.ensureIsAuthenticated,UserCtrl.getUsers)
      .post(authCtrl.ensureIsAuthenticated,UserCtrl.insertUser);
//Empleados

router.route('/Empleados')
      .get(authCtrl.ensureIsAuthenticated,empleadoCtrl.getEstados)
      .post(authCtrl.ensureIsAuthenticated,empleadoCtrl.insertNewEmpleado);

//Vehiculos
router.route('/Vehiculos')
      .get(vehiculoCtrl.getAllVehiculos);
router.route('/insertVehiculos')
      .get(authCtrl.ensureIsAuthenticated,vehiculoCtrl.insertVehiculos)
      .post(authCtrl.ensureIsAuthenticated,vehiculoCtrl.insertNewVehiculo);
router.route('/editVehiculo/:idVehiculo')
      .get(authCtrl.ensureIsAuthenticated,vehiculoCtrl.getEditVehiculos)
      .post(authCtrl.ensureIsAuthenticated,vehiculoCtrl.editVehiculos);
//Tipo vehiculos
router.route('/getAllTipoVehiculos')
      .get(authCtrl.ensureIsAuthenticated,tipoVehiculoCtrl.getAllTipoVehiculos);
router.route('/InsertTipoVehiculo')
      .get(authCtrl.ensureIsAuthenticated,tipoVehiculoCtrl.getInsertTipoVehiculo)
      .post(authCtrl.ensureIsAuthenticated,tipoVehiculoCtrl.insertNewTipoVehiculo);

router.route('/editTipoVehiculo/:tipoVehiculoId')
      .get(authCtrl.ensureIsAuthenticated, tipoVehiculoCtrl.getEditTipoVehiculo)
      .put(authCtrl.ensureIsAuthenticated, tipoVehiculoCtrl.editTipoVehiculo);

//Marca vehiculos

router.route('/marcas')
      .get(authCtrl.ensureIsAuthenticated, marcasCtrl.getMarcasActivas);

router.route('/InsertMarca')
      .get(authCtrl.ensureIsAuthenticated, marcasCtrl.getInsertMarca)
      .post(authCtrl.ensureIsAuthenticated, marcasCtrl.insertMarca);

router.route('/editMarca/:marcaId')
      .get(authCtrl.ensureIsAuthenticated,marcasCtrl.getEditMarca)
      .put(authCtrl.ensureIsAuthenticated,marcasCtrl.editMarca);
module.exports = router;