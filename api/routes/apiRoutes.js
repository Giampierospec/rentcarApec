var express = require('express');

var router = express.Router();
var vehiculoCtrl = require('../controllers/VehiculosController');
router.route('/Vehiculos')
      .get(vehiculoCtrl.getAllVehiculos);
router.route('/insertVehiculos')
      .get(vehiculoCtrl.insertVehiculos)
      .post(vehiculoCtrl.insertNewVehiculo);
router.route('/editVehiculo/:idVehiculo')
      .get(vehiculoCtrl.getEditVehiculos)
      .post(vehiculoCtrl.editVehiculos);
module.exports = router;