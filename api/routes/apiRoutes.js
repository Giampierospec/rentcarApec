var express = require('express');

var router = express.Router();
var vehiculoCtrl = require('../controllers/VehiculosController');
var tipoVehiculoCtrl = require('../controllers/tipoVehiculoControlller');
var marcasCtrl = require('../controllers/marcaController');

var userCtrl = require('../controllers/usersController');

//Usuarios

router.route('/Users')
      .get(userCtrl.getEstados)
      .post(userCtrl.insertNewEmpleado);

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
module.exports = router;