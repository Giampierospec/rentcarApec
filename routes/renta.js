var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/authController');
var rentaCtrl = require('../controllers/RentaCtrl');

router.route('/Clientes')
      .get(authCtrl.ensureIsAuthenticated, authCtrl.checkUserEmpleadoAdmin, rentaCtrl.getRentaClientes);
router.route('/Empleados')
    .get(authCtrl.ensureIsAuthenticated, authCtrl.checkUserEmpleadoAdmin, rentaCtrl.getRentaEmpleados);
module.exports = router;