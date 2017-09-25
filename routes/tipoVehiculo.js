var express = require('express');
var router = express.Router();
var tpCtrl = require('../controllers/tipoVehiculoCtr');
var authCtrl = require('../controllers/authController');
router.route('/')
    .get(authCtrl.ensureIsAuthenticated,tpCtrl.getTipoVehiculos);

router.route('/Insertar')
        .get(authCtrl.ensureIsAuthenticated, authCtrl.checkUserEmpleadoAdmin,tpCtrl.renderInsertTipoVehiculos)
        .post(tpCtrl.insertTipoVehiculo);
router.route('/Editar/:tipoVehiculoId')
        .get(authCtrl.ensureIsAuthenticated, authCtrl.checkUserEmpleadoAdmin, tpCtrl.renderEditTipoVehiculos)
        .post(tpCtrl.EditTipoVehiculo);
module.exports = router;