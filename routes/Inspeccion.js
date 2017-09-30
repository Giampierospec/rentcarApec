var express = require('express');

var router = express.Router();
var authCtrl = require('../controllers/authController');
var inspCtrl = require('../controllers/InspeccionCtrl');

router.route('/')
      .get(authCtrl.ensureIsAuthenticated,authCtrl.checkUserEmpleadoAdmin,inspCtrl.getAllVehiculosInspeccion);
router.route('/genInspeccion/:vehiculoDesc')
      .get(authCtrl.ensureIsAuthenticated, authCtrl.checkUserEmpleadoAdmin, inspCtrl.renderGenInspeccion)
      .post(inspCtrl.procesarInspeccion);

router.route('/Clientes')
      .get(authCtrl.ensureIsAuthenticated, authCtrl.checkUserEmpleadoAdmin,inspCtrl.getInspeccionClientes);
router.route('/Empleados')
      .get(authCtrl.ensureIsAuthenticated, authCtrl.checkUserEmpleadoAdmin, inspCtrl.getInspeccionEmpleados);
module.exports = router;