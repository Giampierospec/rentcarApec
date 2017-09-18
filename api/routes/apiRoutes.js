var express = require('express');

var router = express.Router();
var vehiculoCtrl = require('../controllers/VehiculosController');
router.route('/Vehiculos')
      .get(vehiculoCtrl.getAllVehiculos);
router.route('/insertVehiculos')
      .get(vehiculoCtrl.insertVehiculos);
module.exports = router;