var express = require('express');

var router = express.Router();
var vehiculoCtrl = require('../controllers/VehiculosController');
var tipoVehiculoCtrl = require('../controllers/tipoVehiculoControlller');
var marcasCtrl = require('../controllers/marcaController');

var empleadoCtrl = require('../controllers/EmpleadoController');

var UserCtrl = require('../controllers/UsersController');

var authCtrl = require("../../controllers/authController");

var modeloCtrl = require('../controllers/modeloController');
//User
router.route('/Users')
      .get(UserCtrl.getUsers)
      .post(UserCtrl.insertUser);
//Empleados

router.route('/Empleados')
      .get(empleadoCtrl.getEstados)
      .post(empleadoCtrl.insertNewEmpleado);

//Vehiculos
router.route('/Vehiculos')
      .get(vehiculoCtrl.getAllVehiculos);
router.route('/insertVehiculos')
      .get(vehiculoCtrl.insertVehiculos)
      .post(vehiculoCtrl.insertNewVehiculo);
router.route('/editVehiculo/:idVehiculo')
      .get(vehiculoCtrl.getEditVehiculos)
      .post(vehiculoCtrl.editVehiculos);
//Tipo vehiculos
router.route('/getAllTipoVehiculos')
      .get(tipoVehiculoCtrl.getAllTipoVehiculos);
router.route('/InsertTipoVehiculo')
      .get(tipoVehiculoCtrl.getInsertTipoVehiculo)
      .post(tipoVehiculoCtrl.insertNewTipoVehiculo);

router.route('/editTipoVehiculo/:tipoVehiculoId')
      .get(tipoVehiculoCtrl.getEditTipoVehiculo)
      .put(tipoVehiculoCtrl.editTipoVehiculo);

//Marca vehiculos

router.route('/marcas')
      .get(marcasCtrl.getMarcasActivas);

router.route('/InsertMarca')
      .get(marcasCtrl.getInsertMarca)
      .post(marcasCtrl.insertMarca);

router.route('/editMarca/:marcaId')
      .get(marcasCtrl.getEditMarca)
      .put(marcasCtrl.editMarca);

//Modelos
router.route('/modelos')
      .get(modeloCtrl.getModelos);

router.route('/insertModelo')
      .get(modeloCtrl.getInsertModelo)
      .post(modeloCtrl.insertModelo);

router.route('/editModelo/:modeloId')
      .get(modeloCtrl.getEditModelo)
      .put(modeloCtrl.editModelo);
module.exports = router;