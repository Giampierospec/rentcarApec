var express = require('express');

var router = express.Router();
var modeloCtrl = require('../controllers/modeloCtrl');
var authCtrl = require('../controllers/authController');
router.route('/')
    .get(authCtrl.ensureIsAuthenticated,modeloCtrl.renderModelos);
router.route('/Insertar')
        .get(authCtrl.ensureIsAuthenticated, authCtrl.checkUserEmpleadoAdmin,modeloCtrl.renderInsert)
        .post(modeloCtrl.insertModelo);

router.route('/Editar/:modeloId')
        .get(authCtrl.ensureIsAuthenticated, authCtrl.checkUserEmpleadoAdmin,modeloCtrl.renderEditModelo)
        .post(modeloCtrl.editModelo);
    

module.exports = router;