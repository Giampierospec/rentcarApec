var express = require('express');

var router = express.Router();
var authCtrl = require('../controllers/authController');
var empleadoCtrl = require('../controllers/empleadoCtrl');
router.route('/')
      .get(authCtrl.ensureIsAuthenticated, authCtrl.checkAdmin, empleadoCtrl.renderEmpleados);

router.route('/Insertar')
      .get(authCtrl.ensureIsAuthenticated, authCtrl.checkAdmin,empleadoCtrl.renderInsertEmpleados)
      .post(empleadoCtrl.insertEmpleados);

router.route('/Editar/:empId')
      .get(authCtrl.ensureIsAuthenticated,authCtrl.checkAdmin,empleadoCtrl.renderEditEmpleado)
      .post(empleadoCtrl.editEmpleado);
module.exports = router;