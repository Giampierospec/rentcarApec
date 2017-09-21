var express = require('express');

var router = express.Router();
var vehiculoCtrl = require('../controllers/VehiculosController');
var tipoVehiculoCtrl = require('../controllers/tipoVehiculoControlller');
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
module.exports = router;